import { Inventory } from 'src/data/inventory';
import { Biome } from '../data/biomes';
import { div } from '../lib/dom';

// tiles
const getBiomeClass = (inventory: Inventory, biome: Biome): string => {
  const biomeClass: { [key in Biome]: string } = {
    empty: 'bg-white' + (inventory.stoneFurnace.count ? ' cursor-furnace' : ' cursor-not-allowed'),
    trees: 'bg-green-400 cursor-pointer',
    rocks: 'bg-gray-200 cursor-pointer',
    iron: 'bg-gray-500' + (inventory.stoneAxe.count ? ' cursor-stoneAxe' : ' cursor-not-allowed'),
    coal: 'bg-black' + (inventory.stoneAxe.count ? ' cursor-stoneAxe' : ' cursor-not-allowed'),
  };
  return biomeClass[biome];
};

export const Tile = (inventory: Inventory, biome: Biome, id: number, modifier: string) => div({
  className: `${biome} ${getBiomeClass(inventory, biome)} h-4 w-4${modifier ? ' ' + modifier : ''}`,
  id: 'biome-' + id,
});