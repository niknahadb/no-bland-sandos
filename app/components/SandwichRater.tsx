"use client";

import { useState } from "react";
import IngredientList from "./IngredientList";
import { Ingredient } from "../types/sandwich";
import SandwichPlate from "./SandwichPlate";

const PERFECT_SANDWICH = [
  "Bottom Bun",
  "Bacon",
  "Egg",
  "Cheese",
  "Avocado",
  "Top Bun",
];

const BLT_SANDWICH = ["Bottom Bun", "Bacon", "Lettuce", "Tomato", "Top Bun"];

export default function SandwichRater() {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [score, setScore] = useState<number | null>(null);

  const handleIngredientClick = (ingredient: Ingredient) => {
    if (selectedIngredients.length < 6) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRateSandwich = () => {
    if (selectedIngredients.length !== 6) {
      setScore(0);
      return;
    }

    const hasBottomBun = selectedIngredients[0].name === "Bottom Bun";
    const hasTopBun =
      selectedIngredients[selectedIngredients.length - 1].name === "Top Bun";

    if (!hasBottomBun || !hasTopBun) {
      setScore(0);
      return;
    }

    const ingredientNames = selectedIngredients.map((ing) => ing.name);
    if (JSON.stringify(ingredientNames) === JSON.stringify(PERFECT_SANDWICH)) {
      setScore(100);
      return;
    } else if (
      JSON.stringify(ingredientNames) === JSON.stringify(BLT_SANDWICH)
    ) {
      setScore(99);
      return;
    }

    // Calculate similarity to perfect sandwich
    const similarity = PERFECT_SANDWICH.filter((ing) =>
      ingredientNames.includes(ing)
    ).length;
    const baseScore = Math.floor((similarity / PERFECT_SANDWICH.length) * 80);
    const randomFactor = Math.floor(Math.random() * 20);
    setScore(Math.min(99, baseScore + randomFactor));
  };

  const handleReset = () => {
    setSelectedIngredients([]);
    setScore(null);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl gap-8 bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Build Station</h2>
        <div className="text-lg text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
          Items: {selectedIngredients.length} / 6
        </div>
      </div>
      <div className="flex gap-8">
        <div className="w-1/3">
          <IngredientList
            onIngredientClick={handleIngredientClick}
            disabled={selectedIngredients.length >= 6}
          />
        </div>
        <div className="w-2/3">
          <SandwichPlate ingredients={selectedIngredients} />
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleRateSandwich}
          disabled={selectedIngredients.length !== 6}
          className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Rate My Sandwich
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>
      {score !== null && (
        <div className="mt-4 text-center text-3xl font-bold text-blue-600">
          Your sandwich score: {score}/100
        </div>
      )}
    </div>
  );
}
