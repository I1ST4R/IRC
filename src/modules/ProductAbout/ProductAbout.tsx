import { useParams} from "react-router-dom";
import { BreadCrumb } from "@/shared/ui/components/BreadCrumb";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { useGetProductByIdQuery } from "../ProductList";
import { Unauthorized } from "@/shared/ui/components/Unauthorized";
import { openAccount } from "../AuthForm";
import { ProductTags } from "./components/ProductTags";
import { useAppDispatch } from "@/App/store";
import { ProductInfo } from "./components/ProductInfo";

export const ProductAbout = () => {
  const { id } = useParams();
  const { data: user, isLoading } = useGetUserQuery();
  const { data: product, error } = useGetProductByIdQuery(id ?? "", {
    skip: !id,
  });
  const dispatch = useAppDispatch();
  if (error) return <div>Ошибка при загрузке продукта</div>;
  if (!product || Object.values(product).length === 0 || isLoading) return <div>Товар не найден</div>;
  if (!user?.id)
    return (
      <Unauthorized
        text="чтобы просмотривать товары"
        handleClick={() => dispatch(openAccount())}
      />
    );

  return (
    <div className="product-about container pb-10">
      <BreadCrumb />
      <div className="grid grid-cols-2 gap-10">
        <div className="flex justify-center items-center bg-[rgb(242,242,242)] relative">
          <img
            src={`/${product?.img}`}
            alt={product?.name}
            className=""
          />
          <ProductTags product={product} />
        </div>

        <ProductInfo userId={user.id} product={product}/>
      </div>
    </div>
  );
};
