import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/main/store";
import { addToCart, fetchCart } from "@/entity/cart/slice.ts";
import { addItemToLiked, fetchLiked, removeItemFromLiked } from "@/entity/liked/slice";
import { fetchProductById } from "@/entity/product/slice";
import personalAcc from "@/pages/Home/_general/img/personal-acc.svg";
import PersonalAccount from "@/main/App/PersonalAccount/PersonalAccount";
import { Tag } from "@/entity/tag/types";
import { openAccount } from "@/entity/users/slice";
import BreadCrumb from "@/main/components/BreadCrumb/BreadCrumb";

export const ProductAbout = () => {
  const { id } = useParams();
  const product = useSelector((state: RootState) => state.products.currentProduct);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const likedItems = useSelector((state: RootState) => state.liked.items);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => { id ? dispatch(fetchProductById(id)) : ""}, [dispatch, id])

  const isInCart = () => cartItems.some((item) => item.product.id === product?.id);
  const isLiked = () => likedItems.some((item) => item.id === product?.id);

  const handleCartClick = async () => {
    if (!product) return;
    if (!user.id) {
      dispatch(openAccount())
      return;
    }

    if (isInCart()) navigate("/cart") 
    else dispatch(addToCart({ userId: user.id.toString(), productId: product.id }))
  };

  const switchLike = async (productId: string) => {

    if (!product || !user || !user.id) return;
    const isLiked = likedItems.some((item) => item.id === productId);
    if (isLiked) {
      await dispatch(removeItemFromLiked({ userId: user.id.toString(), productId }));
      await dispatch(fetchLiked(user.id.toString()));
    } else {
      await dispatch(addItemToLiked({ userId: user.id.toString(), productId }));
      await dispatch(fetchLiked(user.id.toString()));
    }
  };


  if (loading === "pending") {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <div className="product-about container">
    <BreadCrumb
      pageLinks={[
        {name: "Главная", link: "/"},
        {name: "Каталог", link: "/catalog"},
        {name: product.name, link: "/catalog"},
      ]}
    />
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
            <div className="product__prices product-about__prices">
              <span>{product.price} ₽</span>
              <span className="product__prev-price product-about__prev-price">
                {product.prevPrice} ₽
              </span>
            </div>

            {!user.id ? (
              <div className="product-about__auth-block">
                <img src={personalAcc} alt="personal-acc" />
                <span className="product-about__auth-text">
                  <button
                    className="product-about__auth-btn"
                    onClick={() => dispatch(openAccount())}
                  >
                    Авторизуйся
                  </button>
                  и получай бонусы и эксклюзивные скидки
                </span>
              </div>
            ) : (
              <>
                <button
                  className={`product__btn product-about__btn ${
                    isInCart() ? "product__btn--in-cart" : ""
                  }`}
                  onClick={handleCartClick}
                >
                  {isInCart() ? "В корзине" : "Добавить в корзину"}
                </button>

                <button
                  className={`product__like product-about__like ${
                    isLiked() ? " product__like--active" : ""
                  }`}
                  onClick={() => switchLike(product.id)}
                  title={isLiked() ? "Убрать из избранного" : "В избранное"}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill={isLiked() ? '#CA354F' : '#ECECEC'}
                      stroke="#CA354F"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
              </>
            )}
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
      {user.isAccountOpen && (
        <PersonalAccount/>
      )}
    </div>
  );
};
