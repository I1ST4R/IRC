import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export const Home = () => {
  return (
    <div className={styles.home}>
      <h1>Добро пожаловать в наш магазин</h1>
      <div className={styles.links}>
        <Link to="/catalog" className={styles.link}>
          Перейти в каталог
        </Link>
        <Link to="/auth" className={styles.link}>
          Войти в аккаунт
        </Link>
      </div>
    </div>
  );
}; 