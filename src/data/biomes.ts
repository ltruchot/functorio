import { randInArray } from '../lib/random';

export enum Biome  {
  empty = 'empty',
  trees = 'trees',
  rocks = 'rocks',
  iron = 'iron',
  coal = 'coal',
}

export const makeBiomes = (n: number): Biome[] => Array
  .from(Array(n))
  .map(() => randInArray(Object.values(Biome)));
