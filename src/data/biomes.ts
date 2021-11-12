import { randInArray } from '../utils/random';
import { Biome } from './../model';


export const makeBiomes = (n: number): Biome[] => Array
  .from(Array(n))
  .map(() => randInArray(Object.values(Biome))) 