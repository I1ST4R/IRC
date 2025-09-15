import axios from "axios";
import { API_CLIENT } from "@/shared/consts";
import { Tag } from "./tagTypes";

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

export const getTagsById = async (tagsId: string[]): Promise<Record<string, Tag>> => {
  const tagsArray = await Promise.all(tagsId.map(tagId => getTagById(tagId)));

  return tagsArray.reduce((record, tag) => {
    if (tag) {
      record[tag.id] = tag;
    }
    return record;
  }, {} as Record<string, Tag>);
};