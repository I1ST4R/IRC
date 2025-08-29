import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, ForkEffect } from 'redux-saga/effects';

export interface EntityConfig<RequestPayload, SuccessPayload, State> {
  sliceName: string;
  initialState: State;
  requestActionName: string;
  actionNames: {
    request: string;
    success: string;
    failure: string;
    clear?: string;
  };
  extraReducers?: Record<string, (state: State, action: PayloadAction<any>) => void>;
  // Reducers are provided to keep full control over state shape differences
  onRequest: (state: State, action: PayloadAction<RequestPayload>) => void;
  onSuccess: (state: State, action: PayloadAction<SuccessPayload>) => void;
  onFailure: (state: State, action: PayloadAction<string>) => void;
  onClear?: (state: State) => void;
  // API call used inside worker saga
  apiCall: (payload: RequestPayload) => Promise<SuccessPayload>;
}

export interface CreatedEntity<RequestPayload, SuccessPayload, State> {
  reducer: (state: State | undefined, action: PayloadAction<any>) => State;
  actions: {
    request: (payload: RequestPayload) => PayloadAction<RequestPayload>;
    success: (payload: SuccessPayload) => PayloadAction<SuccessPayload>;
    failure: (payload: string) => PayloadAction<string>;
    clear?: () => PayloadAction<void>;
  };
  allActions: Record<string, unknown>;
  // Watcher saga bound to the sliceName/requestActionName
  saga: () => Generator<ForkEffect, void, unknown>;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null && 'message' in error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return String((error as any).message);
  }
  if (typeof error === 'string') return error;
  return 'Unexpected error';
}

export function createEntityModule<RequestPayload, SuccessPayload, State>(
  config: EntityConfig<RequestPayload, SuccessPayload, State>
): CreatedEntity<RequestPayload, SuccessPayload, State> {
  const reducers: Record<string, unknown> = {};
  reducers[config.actionNames.request] = config.onRequest;
  reducers[config.actionNames.success] = config.onSuccess;
  reducers[config.actionNames.failure] = config.onFailure;
  if (config.onClear && config.actionNames.clear) reducers[config.actionNames.clear] = config.onClear;
  if (config.extraReducers) {
    for (const key of Object.keys(config.extraReducers)) {
      // Do not allow overriding core action handlers
      if (!(key in reducers)) reducers[key] = config.extraReducers[key] as unknown;
    }
  }

  const slice = createSlice({
    name: config.sliceName,
    initialState: config.initialState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reducers: reducers as any
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typedActions = slice.actions as any;
  const request = typedActions[config.actionNames.request] as (payload: RequestPayload) => PayloadAction<RequestPayload>;
  const success = typedActions[config.actionNames.success] as (payload: SuccessPayload) => PayloadAction<SuccessPayload>;
  const failure = typedActions[config.actionNames.failure] as (payload: string) => PayloadAction<string>;
  const clear = config.actionNames.clear ? (typedActions[config.actionNames.clear] as () => PayloadAction<void>) : undefined;

  function* worker(action: PayloadAction<RequestPayload>) {
    try {
      const result: SuccessPayload = yield call(config.apiCall, action.payload);
      yield put(success(result));
    } catch (error: unknown) {
      yield put(failure(getErrorMessage(error)));
    }
  }

  function* watcher(): Generator<ForkEffect, void, unknown> {
    yield takeEvery(`${config.sliceName}/${config.requestActionName}`, worker);
  }

  return {
    reducer: slice.reducer as unknown as (state: State | undefined, action: PayloadAction<any>) => State,
    actions: { request, success, failure, ...(clear ? { clear } : {}) },
    allActions: slice.actions as unknown as Record<string, unknown>,
    saga: watcher
  };
}


