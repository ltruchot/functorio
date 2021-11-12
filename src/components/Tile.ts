import { Biome } from "../model";
import { div } from "../utils/dom";

// tiles
const biomeClass: { [key in Biome]: string } = {
  empty: 'bg-white',
  trees: 'bg-green-400 cursor-pointer',
  rocks: 'bg-gray-200 cursor-pointer',
  iron: 'bg-gray-500 cursor-not-allowed'
};

export const Tile = (biome: Biome) => div({
  className: `${biome} ${biomeClass[biome]} h-4 w-4`
})