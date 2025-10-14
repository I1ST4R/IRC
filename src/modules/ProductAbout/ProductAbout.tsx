import { useParams} from "react-router-dom";
import { BreadCrumb } from "@/shared/ui/components/BreadCrumb";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { useGetProductByIdQuery } from "../ProductList";
import { Unauthorized } from "@/shared/ui/components/Unauthorized";
import { openAccount } from "../AuthForm";
import { ProductTags } from "./components/ProductTags";
import { ProductInfo } from "./components/ProductInfo";
import { useAppDispatch } from "@/App/store";

export const ProductAbout = () => {
  const { id } = useParams();
  const { data: user } = useGetUserQuery();
  const { data: product, error } = useGetProductByIdQuery(id ?? "", {
    skip: !id,
  });
  const dispatch = useAppDispatch();
  if (error) return <div>Ошибка при загрузке продукта</div>;
  if (!product) return <div>Товар не найден</div>;
  if (!user?.id)
    return (
      <Unauthorized
        text="чтобы просмотривать товары"
        handleClick={() => dispatch(openAccount())}
      />
    );

  return (
    <div className="product-about container">
      <BreadCrumb />
      <div className="product-about__container">
        <div className="product-about__image-container">
          <img
            src={`/${product.img}`}
            alt={product.name}
            className="product-about__image"
          />
          <ProductTags product={product} />
        </div>

        <ProductInfo userId={user.id} product={product}/>
      </div>
    </div>
  );
};
