import { useParams, useNavigate, Link } from "react-router-dom";
import { BreadCrumb } from "@/shared/ui/components/BreadCrumb";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { Tag, useGetProductByIdQuery } from "../ProductList";
import { Unauthorized } from "@/shared/ui/components/Unauthorized";
import { openAccount, useAppDispatch } from "../AuthForm";
import { ProductPrices } from "./components/ProductPrices";
import { ProductCartBtn } from "./components/ProductCartBtn";
import { ProductLikeBtn } from "./components/ProductLikeBtn";

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

          <div className="product-about__tags">
            {product.tags.map((tag: Tag) => (
              <span key={`${tag.name}-${product.id}`} className="product__tag">
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        <div className="product-about__info">
          <h3 className="product-about__name">{product.name}</h3>
          <h3 className="product-about__technology">{product.technology}</h3>
          <h3 className="product-about__article">{product.article}</h3>
          <h3 className="product-about__description">{product.description}</h3>

          <div className="product-about__prices-cart-liked">
            <ProductPrices
              price={product.price}
              prevPrice={product.prevPrice}
            />
            <ProductCartBtn userId={user.id} productId={product.id} />
            <ProductLikeBtn userId={user.id} productId={product.id}/>
          </div>

          <div className="product-about__point product-about__point--first">
            <h3 className="product-about__point-title">Формула</h3>
            <div className="product-about__point-list">
              {product.formula.map((item: string, index: number) => (
                <p key={index} className="product-about__formula-item">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="product-about__point">
            <h3 className="product-about__point-title">Для чего</h3>
            <p>{product.for_what}</p>
          </div>

          <div className="product-about__point">
            <h3 className="product-about__point-title">Тип кожи</h3>
            <p>{product.skin_type}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
