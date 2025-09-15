import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/menuStore";
import { selectTagsId, toggleTag } from "../store/filter/filterSlice";
import { useCallback } from "react";

type MenuTagProps = {
  tagId: string
  tagName: string
}

export const MenuTag = ({tagId, tagName} : MenuTagProps) => {
  
  const filterTags = useSelector(selectTagsId);
  const dispatch = useDispatch<AppDispatch>();

  const isTagSelected = useCallback(
    (tagId: string) => {
      return filterTags.some((t: string) => t === tagId) || false;
    },
    [filterTags]
  );

  return (
    <label key={tagId} className="menu__checkbox">
      <input
        type="checkbox"
        checked={isTagSelected(tagId)}
        onChange={() => dispatch(toggleTag(tagId))}
      />
      <span>{tagName}</span>
    </label>
  );
};
