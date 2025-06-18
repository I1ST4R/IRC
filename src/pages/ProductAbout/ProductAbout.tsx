import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/main/store";
import { addToCart, fetchCart } from "@/entity/cart/slice.ts";
import { addItemToLiked, fetchLiked } from "@/entity/liked/slice";
import { fetchTagsById } from '../../entity/tag/slice';
import { fetchProductById } from '@/entity/product/slice';
import personalAcc from "@/pages/Home/_general/img/personal-acc.svg";
import PersonalAccount from "@/main/App/PersonalAccount/PersonalAccount";

export const ProductAbout = ({
  onRemoveFromLiked,
}: {
  onRemoveFromLiked?: () => void;
}) => {
  const { id } = useParams();
  const product = useSelector((state: RootState) => state.products.currentProduct);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const likedItems = useSelector((state: RootState) => state.liked.items);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isPersonalAccountOpen, setIsPersonalAccountOpen] = useState(false);
  const tags = useSelector((state: RootState) => state.tags.tags);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  //tags dispatch
  useEffect(() => {
    if (product?.tags) {
      dispatch(fetchTagsById(product.tags));
    }
  }, [dispatch, product?.tags]);

  const isInCart = cartItems.some((item) => item.product.id === product?.id);
  const isLiked = likedItems.some((item) => item.productId === product?.id);

  const handleCartClick = async () => {
    if (!user?.id) {
      togglePersonalAccount();
      return;
    }

    if (!product) return

    if (isInCart) {
      navigate("/cart");
    } else {
      try {
        await dispatch(addToCart({ userId: user.id.toString(), productId: product.id }));
        await dispatch(fetchCart(user.id.toString()));
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    }
  };

  const handleLike = async () => {
    if (!user?.id) {
      togglePersonalAccount();
      return;
    }

    if (!product) return

    if (onRemoveFromLiked) {
      onRemoveFromLiked();
    } else {
      await dispatch(
        addItemToLiked({ userId: user.id.toString(), productId: product.id })
      );
      await dispatch(fetchLiked(user.id.toString()));
    }
  };

  const getTagName = (tagId: string) => {
    if (!tagId) return "";
    const tag = tags.find(t => t.id === tagId);
    return tag?.name || "";
  };

  const togglePersonalAccount = () => {
    setIsPersonalAccountOpen(!isPersonalAccountOpen);
  };

  if (loading === 'pending') {
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
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb__link">
          Главная
        </Link>
        <span className="breadcrumbs__separator">/</span>
        <Link to="/catalog" className="breadcrumb__link">
          Каталог
        </Link>
        <span className="breadcrumb__separator">/</span>
        <span className="breadcrumb__current">{product.name}</span>
      </div>

      <div className="product-about__container">
        <div className="product-about__image-container">
          <img
            src={`/${product.img}`}
            alt={product.name}
            className="product-about__image"
          />

          <div className="product-about__tags">
            {product.tags.map((tagString: string) => (
              <span key={`${tagString}`} className="product__tag">
                {getTagName(tagString)}
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

            {!user ? (
              <div className="product-about__auth-block">
                <button
                  className="product-about__auth-btn"
                  onClick={togglePersonalAccount}
                >
                  <img src={personalAcc} alt="personal-acc" />
                  <span className="product-about__auth-text">
                    <Link
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        togglePersonalAccount();
                      }}
                    >
                      Авторизуйся
                    </Link>{" "}
                    и получай бонусы и эксклюзивные скидки
                  </span>
                </button>
              </div>
            ) : (
              <>
                <button
                  className={`product__btn product-about__btn ${
                    isInCart ? "product__btn--in-cart" : ""
                  }`}
                  onClick={handleCartClick}
                >
                  {isInCart ? "В корзине" : "Добавить в корзину"}
                </button>

                <button
                  className={`product__like product-about__like ${
                    isLiked ? " product__like--active" : ""
                  }`}
                  onClick={handleLike}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_219_4352)">
                      <path
                        id="heart-main"
                        d="M14.5835 1.59766C13.6451 1.61225 12.7272 1.8742 11.9224 2.35705C11.1177 2.8399 10.4546 3.52655 10.0001 4.34766C9.54566 3.52655 8.88257 2.8399 8.07783 2.35705C7.27308 1.8742 6.35517 1.61225 5.41679 1.59766C3.92091 1.66265 2.51155 2.31703 1.49661 3.41785C0.481678 4.51867 -0.0563308 5.97643 0.000128002 7.47266C0.000128002 11.2618 3.98846 15.4002 7.33346 18.206C8.08031 18.8336 9.02459 19.1777 10.0001 19.1777C10.9757 19.1777 11.9199 18.8336 12.6668 18.206C16.0118 15.4002 20.0001 11.2618 20.0001 7.47266C20.0566 5.97643 19.5186 4.51867 18.5036 3.41785C17.4887 2.31703 16.0793 1.66265 14.5835 1.59766Z"
                        fill="#CA354F"
                      />

                      <path
                        id="heart-inner"
                        d="M11.596 16.931C11.1493 17.3071 10.5841 17.5134 10.0001 17.5134C9.41617 17.5134 8.85098 17.3071 8.40429 16.931C4.12263 13.3385 1.66679 9.89182 1.66679 7.47266C1.60983 6.41825 1.9721 5.3841 2.6746 4.59574C3.37709 3.80738 4.36282 3.32878 5.41679 3.26432C6.47077 3.32878 7.45649 3.80738 8.15899 4.59574C8.86149 5.3841 9.22376 6.41825 9.16679 7.47266C9.16679 7.69367 9.25459 7.90563 9.41087 8.06191C9.56715 8.21819 9.77911 8.30599 10.0001 8.30599C10.2211 8.30599 10.4331 8.21819 10.5894 8.06191C10.7457 7.90563 10.8335 7.69367 10.8335 7.47266C10.7765 6.41825 11.1388 5.3841 11.8413 4.59574C12.5438 3.80738 13.5295 3.32878 14.5835 3.26432C15.6374 3.32878 16.6232 3.80738 17.3257 4.59574C18.0282 5.3841 18.3904 6.41825 18.3335 7.47266C18.3335 9.89182 15.8776 13.3385 11.596 16.9277V16.931Z"
                        fill="#F2F2F2"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_219_4352">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
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
      {isPersonalAccountOpen && (
        <PersonalAccount onClose={togglePersonalAccount} />
      )}
    </div>
  );
};
