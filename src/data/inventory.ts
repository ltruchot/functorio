import { Biome } from "../model";

export const inventory: {  [key in Biome]?: { name: string, count: number }} = {
  [Biome.trees]: { name: "branches", count: 0},
  [Biome.rocks]: { name: "stones", count: 0}
}