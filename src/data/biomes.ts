import { randInArray } from '../lib/random';

export enum Biome  {
  empty = 'empty',
  trees = 'trees',
  rocks = 'rocks',
  iron = 'iron',
  coal = 'coal',
}

export type DisplayedBiome = { type: Biome, modifier: string, id: number };
export const makeBiomes = (n: number): Array<DisplayedBiome> => Array
  .from(Array(n))
  .map((_, id) => ({ type: randInArray(Object.values(Biome)), modifier: '', id }));
