import { initialState } from "./productFilterSlice";
import { FilterState } from "./productFilterTypes";


const initialJSON = JSON.stringify(initialState);

export const checkIsInitial = (state: FilterState): boolean => {
  return JSON.stringify(state) === initialJSON;
};