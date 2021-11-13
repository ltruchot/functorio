export enum Item {
  branch = 'branch',
  stone = 'stone',
  charcoal = 'charcoal',
  stoneAxe = 'stoneAxe',
  furnace = 'furnace',
}
type Recipe = [Item, number][];

type Inventory = {  [key in Item]: { name: string, count: number, incRecipe: Recipe } };

export const inventory: Inventory  = {
  [Item.branch]: { name: 'branche(s)', count: 0, incRecipe: [] },
  [Item.stone]: { name: 'stone(s)', count: 0, incRecipe: [] },
  [Item.charcoal]: { name: 'stone(s)', count: 0, incRecipe: [] },
  [Item.stoneAxe]: { name: 'stone axe(s)', count: 0, incRecipe: [[Item.branch, 2], [Item.stone, 1]] },
  [Item.furnace]: { name: 'furnace(s)', count: 0, incRecipe: [[Item.stone, 10], [Item.charcoal, 10]] },
};

export const checkReadyRecipe = (recipe: Recipe, currentInventory: Inventory): boolean => Boolean(recipe.length)
  && recipe.every(([key, count]) => count < currentInventory[key].count);
