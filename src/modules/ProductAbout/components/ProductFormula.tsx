export const ProductFormula = ({formula} : {formula: string[]}) => {
  return (
    <div className="py-8 border-b border-black/7 border-t border-black/7">
      <h3 className="font-extrabold text-lg tracking-wider uppercase">Формула</h3>
      <div className="flex gap-4 mt-2 md:flex-row flex-col">
        {formula.map((item: string, index: number) => (
          <p key={index} className="px-3 py-2 bg-gray-50 text-sm font-medium">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};