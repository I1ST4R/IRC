import { useDispatch, useSelector } from "react-redux"
import { selectTagsId, toggleTag } from "../store/filter/filterSlice"
import { useCallback } from "react"
import { Checkbox } from "@radix-ui/react-checkbox"
import { Label } from "@radix-ui/react-label"
import { AppDispatch } from "@/App/store"

type MenuTagProps = {
  tagId: string
  tagName: string
}

export const MenuTag = ({tagId, tagName} : MenuTagProps) => {
  
  const filterTags = useSelector(selectTagsId)
  const dispatch = useDispatch<AppDispatch>()

  const isTagSelected = useCallback(
    (tagId: string) => {
      return filterTags.some((t: string) => t === tagId) || false
    },
    [filterTags]
  );

  return (
    <label key={tagId} className="flex items-center gap-2 cursor-pointer font-manrope text-sm text-[#333]">
      <Checkbox 
        id={tagId} 
        checked={isTagSelected(tagId)} 
        onChange={() => dispatch(toggleTag(tagId))}
      />
      <Label htmlFor="terms">{tagName}</Label>
    </label>
  );
};
