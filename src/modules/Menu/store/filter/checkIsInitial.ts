import { initialState } from "./filterSlice";
import { FilterState } from "./filterTypes";

const initialJSON = JSON.stringify(initialState);

export const checkIsInitial = (state: FilterState): boolean => {
  return JSON.stringify(state) === initialJSON;
};