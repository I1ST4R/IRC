import { Spinner } from "../kit/spinner";

export const Loader = ({title} : {title: string}) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>
        <span>Загрузка...</span>
        <span><Spinner /></span>
      </div>
    </div>
  );
};
