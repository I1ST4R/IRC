import { openAccount } from "@/_old-version/entity/account/slice";
import { useAppDispatch } from "@/shared/store/sharedStore";

export const CartBodyAnauthorized = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="my-[150px_0_100px_0] text-center text-lg flex flex-col items-center gap-10">
      <p className="font-europeext font-black text-xl tracking-wide uppercase text-center">
        <button
          className="text-[var(--coral)] bg-transparent border-none font-black text-xl tracking-wide uppercase cursor-pointer p-0 mt-2.5 underline transition-colors duration-300 hover:text-[var(--coralDark)]"
          onClick={() => dispatch(openAccount())}
        >
          ВОЙДИТЕ
        </button>
        , ЧТОБЫ ДОБАВЛЯТЬ ТОВАРЫ в корзину
      </p>
    </div>
  );
};
