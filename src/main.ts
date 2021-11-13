import { fromEvent } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Biome, makeBiomes } from './data/biomes';
import { button, byId, div } from './lib/dom';
import { Tile } from './components/Tile';
import { checkReadyRecipe, inventory, Item } from './data/inventory';

const biomes = makeBiomes(16 * 16);
console.log(biomes);
const app = byId('app') as HTMLElement;
app.classList.add('h-screen', 'flex', 'justify-center', 'items-center');

const clickEvents = fromEvent(document, 'click', (e) => e.target as HTMLElement);

clickEvents.pipe(
  filter(el => el.classList.contains(Biome.trees)),
  tap(() => inventory[Item.branch].count++),
  tap(renderInventory),
).subscribe();
  
clickEvents.pipe(
  filter(el => el.classList.contains(Biome.rocks)),
  tap(() => inventory[Item.stone].count++),
  tap(renderInventory),
).subscribe();

const worldEl = div(
  { className: 'flex flex-wrap w-64 m-auto' },
  biomes.map(biome => Tile(biome)),
);

const inventoryEl = div({ className: 'w-64' });
// const recipesEl = div({ className: "w64"});

function renderInventory() {
  const rows = Object.values(inventory).map((row) => div({}, [
    row.name + ':' + row.count,
    button({ className: checkReadyRecipe(row.incRecipe, inventory) ? 'block' : 'hidden' }, ['+']),
  ]));

  inventoryEl.replaceChildren(...rows);
}

app.replaceChildren(worldEl, inventoryEl);
renderInventory();