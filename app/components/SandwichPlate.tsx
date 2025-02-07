import { Ingredient } from "../types/sandwich";

type SandwichPlateProps = {
  ingredients: Ingredient[];
};

export default function SandwichPlate({ ingredients }: SandwichPlateProps) {
  return (
    <div className="bg-blue-50 p-8 rounded-2xl shadow-inner flex flex-col justify-end items-center h-96 overflow-hidden border border-blue-200">
      {ingredients.length === 0 ? (
        <span className="text-blue-400 text-2xl mb-8">
          Start building your sandwich!
        </span>
      ) : (
        <div className="flex flex-col-reverse items-center">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="text-6xl -mb-6 first:mb-0 transition-all duration-300"
              style={{
                transform: `translateY(${index * 5}px) scale(${
                  1 + index * 0.05
                })`,
                filter: `drop-shadow(0 ${
                  4 + index * 2
                }px 3px rgba(0, 0, 0, 0.1))`,
              }}
            >
              {ingredient.icon}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
