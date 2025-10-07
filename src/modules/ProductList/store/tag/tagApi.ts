import axios from "axios";
import { API_CLIENT } from "@/shared/consts";
import { Tag } from "./tagTypes";

const axiosInstance = axios.create(API_CLIENT);

export const getTagById = async (tagId: string) => {
  try{
    const response = await axiosInstance.get(`/productTags/${tagId}`);
    return response.data as Tag;
  } catch (error: any) {
    console.error('error in getTagById', error);
    throw error;
  }
}

export const getTagsById = async (tagsId: string[]) => {
  const tagsArray = await Promise.all(tagsId.map(tagId => getTagById(tagId)));

  return tagsArray
};