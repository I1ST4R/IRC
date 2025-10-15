import { useDispatch, useSelector } from "react-redux"
import { selectTagsId, toggleTag } from "../store/filter/filterSlice"
import { useCallback } from "react"
import { Label } from "@radix-ui/react-label"
import { AppDispatch } from "@/App/store"
import { Checkbox } from "@/shared/ui/kit/checkbox"

type MenuTagProps = {
  tagId: string
  tagName: string
}

export const MenuTag = ({tagId, tagName} : MenuTagProps) => {
  
  const filterTags = useSelector(selectTagsId)
  const dispatch = useDispatch<AppDispatch>()

  console.log(filterTags)

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
        onClick={() => dispatch(toggleTag(tagId))}
        className="w-5 h-5"
      />
      <Label htmlFor="terms">{tagName}</Label>
    </label>
  );
};
