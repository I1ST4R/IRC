export const ProductFormula = ({formula} : {formula: string[]}) => {
  return (
    <div className="product-about__point product-about__point--first">
      <h3 className="product-about__point-title">Формула</h3>
      <div className="product-about__point-list">
        {formula.map((item: string, index: number) => (
          <p key={index} className="product-about__formula-item">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};
