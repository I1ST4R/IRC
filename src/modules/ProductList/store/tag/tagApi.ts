import axios from "axios";
import { API_CLIENT } from "@/shared/consts";

const axiosInstance = axios.create(API_CLIENT);

export const getTagById = async (tagId: string) => {
  try{
    const response = await axiosInstance.get(`/productTags/${tagId}`);
    return response.data;
  } catch (error: any) {
    console.error('error in getTagById', error);
    throw error;
  }
}

export const getTagsById = async (tagsId: string[]) => {
  return Promise.all(tagsId.map(tagId => getTagById(tagId)));
};