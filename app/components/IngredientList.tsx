import { Ingredient, ingredients } from "../types/sandwich";

type IngredientListProps = {
  onIngredientClick: (ingredient: Ingredient) => void;
  disabled: boolean;
};

export default function IngredientList({
  onIngredientClick,
  disabled,
}: IngredientListProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {ingredients.map((ingredient) => (
        <button
          key={ingredient.name}
          onClick={() => onIngredientClick(ingredient)}
          disabled={disabled}
          className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-4xl mb-2">{ingredient.icon}</span>
          <span className="text-sm font-medium text-center text-gray-600">
            {ingredient.name}
          </span>
        </button>
      ))}
    </div>
  );
}
