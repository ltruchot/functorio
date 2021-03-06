
import { fromEvent, interval, timer, merge, concat, Observable, pipe, of, from, EMPTY, forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { filter, tap, pluck, mapTo, map,
  reduce, scan, take, first, takeWhile, takeUntil, distinctUntilChanged, distinctUntilKeyChanged, skip,
  debounce, debounceTime, throttleTime, sampleTime, sample, delay,
  mergeMap, mergeAll, switchMap, concatMap, exhaustMap, mergeMapTo, finalize, switchMapTo,
  catchError,
  startWith, endWith,
  concatWith, withLatestFrom,
  share,
} from 'rxjs/operators';
import { Biome, makeBiomes, DisplayedBiome } from './data/biomes';
import { button, byId, div } from './lib/dom';
import { Tile } from './components/Tile';
import { checkReadyRecipe, inventory, Item } from './data/inventory';

const biomes = makeBiomes(16 * 16);
const app = byId('app') as HTMLElement;
app.classList.add('h-screen', 'flex', 'justify-center', 'items-center');

const gatherBiome = (biome: Biome, item: Item) => pipe(
  filter((el: HTMLElement) => el.classList.contains(biome)),
  tap(() => inventory[item].count++),
);

const mineBiome = (biome: Biome, item: Item) => pipe(
  filter((el: HTMLElement) => el.classList.contains(biome)),
  tap(() => {
    if (inventory[Item.stoneAxe].count > 0) {
      inventory[item].count++;
      inventory[Item.stoneAxe].count--;
    }
  }),
);

const worldEl = div( { className: 'flex flex-wrap w-64 mx-2' });
const inventoryEl = div({ className: 'w-64' });
function renderInventory() {
  const rows = Object.entries(inventory).map(([itemType, row]) => div({ className:' flex items-center' }, [
    row.name + ':' + row.count,
    button({ className: `${itemType} ${checkReadyRecipe(row.incRecipe, inventory) ? 'flex' : 'hidden'}` }, ['+']),
  ]));

  inventoryEl.replaceChildren(...rows);
}

function renderWorld() {
  worldEl.replaceChildren(...biomes.map(({ type, id, modifier }) => Tile(inventory, type, id, modifier)));
}

function renderGame() {
  renderInventory();
  renderWorld();
}

app.replaceChildren(worldEl, inventoryEl);
renderWorld();
renderInventory();

const clickEvents$ = fromEvent(document, 'click').pipe(pluck('target')) as  Observable<HTMLElement>;
const activeFurnaces$ = timer(0, 5000).pipe(
  tap(() => {
    if (inventory.charcoal.count > 0 && inventory.ironOre.count > 0) {
      inventory.charcoal.count--;
      inventory.ironOre.count--;
      inventory.ironLingot.count++;
    }
  }));
merge(
  // gather basic resources
  clickEvents$.pipe(gatherBiome(Biome.trees, Item.branch)),
  clickEvents$.pipe(gatherBiome(Biome.rocks, Item.stone)),

  // mine solid resources
  clickEvents$.pipe(mineBiome(Biome.iron, Item.ironOre)),
  clickEvents$.pipe(mineBiome(Biome.coal, Item.charcoal)),

  // place constructions
  // furnace
  clickEvents$.pipe(
    filter(el => el.classList.contains(Biome.empty)),
    filter(_ => inventory[Item.stoneFurnace].count > 0),
    tap((el) => {
      const biome = biomes.find(b => b.id === Number(el.id.replace('biome-', ''))) as DisplayedBiome;
      biome.modifier = 'bg-stoneFurnace';
      inventory[Item.stoneFurnace].count--;
    }),
    mergeMapTo(activeFurnaces$),
    tap(console.log),
  ),

  // buttons to create
  ...Object.values(Item).map(item => clickEvents$.pipe(
    filter(el => el.classList.contains(item)),
    tap(() => {
      inventory[item].incRecipe.forEach(([element, count]) => {
        inventory[element].count -= count;
      });
      inventory[item].count++;
    }),
  )),  
).pipe(tap(renderGame), mapTo('rx event')).subscribe(console.log);
