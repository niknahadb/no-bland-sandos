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
  const [message, setMessage] = useState<string | null>(null);

  const handleIngredientClick = (ingredient: Ingredient) => {
    if (selectedIngredients.length < 6) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
      setMessage(null);
    }
  };

  const handleRateSandwich = () => {
    const hasBottomBun = selectedIngredients[0].name === "Bottom Bun";
    const hasTopBun =
      selectedIngredients[selectedIngredients.length - 1].name === "Top Bun";

    if (!hasBottomBun || !hasTopBun) {
      setScore(0);
      setMessage(
        "Hint: Every valid sandwich starts with a bottom bun and ends with a top bun"
      );
      return;
    }

    const ingredientNames = selectedIngredients.map((ing) => ing.name);

    if (JSON.stringify(ingredientNames) === JSON.stringify(PERFECT_SANDWICH)) {
      setScore(100);
      setMessage("NOW THATS A SANDWICH!");
      return;
    } else if (
      JSON.stringify(ingredientNames) === JSON.stringify(BLT_SANDWICH)
    ) {
      setScore(99);
      setMessage("A classic BLT! Almost perfect.");
      return;
    }

    let correctIngredients = 0;
    let correctOrder = 0;

    for (let i = 0; i < PERFECT_SANDWICH.length; i++) {
      if (ingredientNames.includes(PERFECT_SANDWICH[i])) {
        correctIngredients++;
      }
      if (ingredientNames[i] === PERFECT_SANDWICH[i]) {
        correctOrder++;
      }
    }

    const ingredientScore = (correctIngredients / PERFECT_SANDWICH.length) * 50; // 50% for ingredients
    const orderScore = (correctOrder / PERFECT_SANDWICH.length) * 50; // 50% for order

    const finalScore = Math.round(ingredientScore + orderScore);
    setScore(finalScore);

    // Construct a helpful message
    let feedbackMessage = "";
    if (correctIngredients === 6) {
      feedbackMessage = "You have all the right ingredients!";
    } else {
      feedbackMessage = `You have ${correctIngredients} out of 6 correct ingredients.`;
    }

    if (correctOrder < 6 && correctIngredients === 6) {
      feedbackMessage += " Try reordering them!";
    }

    setMessage(feedbackMessage);
  };

  const handleReset = () => {
    setSelectedIngredients([]);
    setScore(null);
    setMessage(null);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl gap-8 bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Build Your Breakfast
        </h2>
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
          disabled={selectedIngredients.length < 1}
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
          Valid Score: {score}/100
          {message && (
            <p className="text-lg text-gray-700 mt-2">{message}</p>
          )}{" "}
          {/* Display message */}
        </div>
      )}
    </div>
  );
}
