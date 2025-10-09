import { Link } from "react-router-dom";

type EmptyListProps = {
  title: string
  message: string
}

export const EmptyList = ({
  title,
  message,
} : EmptyListProps) => {
  return (
    <div className="cart__empty">
      <h2 className="cart__title">{title}</h2>
      <div className="cart__empty-text">
        <p className="cart__empty-message">{message}</p>
        <p className="cart__empty-link">
          <Link to="/catalog">Нажмите здесь,</Link>
          чтобы перейти в каталог
        </p>
      </div>
    </div>
  );
};
