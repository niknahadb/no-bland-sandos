export type Ingredient = {
  name: string;
  icon: string;
  type: "bun" | "filling";
};

export const ingredients: Ingredient[] = [
  { name: "Bottom Bun", icon: "🍞", type: "bun" },
  { name: "Cheese", icon: "🧀", type: "filling" },
  { name: "Lettuce", icon: "🥬", type: "filling" },
  { name: "Tomato", icon: "🍅", type: "filling" },
  { name: "Ham", icon: "🍖", type: "filling" },
  { name: "Egg", icon: "🥚", type: "filling" },
  { name: "Bacon", icon: "🥓", type: "filling" },
  { name: "Avocado", icon: "🥑", type: "filling" },
  { name: "Cucumber", icon: "🥒", type: "filling" },
  { name: "Top Bun", icon: "🍞", type: "bun" },
];
