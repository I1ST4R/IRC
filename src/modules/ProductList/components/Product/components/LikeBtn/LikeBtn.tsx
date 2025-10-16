import { cn } from "@/shared/lib/css";
import { useLiked } from "./useLiked";

export type ProductBtnProps = {
  userId: string,
  productId: string,
  isLiked: boolean
}

export const LikeBtn = (props: ProductBtnProps) => {
  const likeClick = useLiked(props);

  return (
    <button
      className={cn(
        "absolute top-5 left-5 bg-none border-none cursor-pointer p-0 flex items-center justify-center",
        props.isLiked && "[&_svg]:fill-[#CA354F] [&_svg]:stroke-[#CA354F]"
      )}
      onClick={likeClick}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        className="transition-[fill,stroke] fill-none stroke-[#CA354F] duration-500 stroke-2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
};
