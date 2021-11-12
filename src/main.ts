import { Biome } from "./model";
import { fromEvent } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { makeBiomes } from "./data/biomes";
import { byId, div } from "./utils/dom";
import { Tile } from "./components/Tile";
import { inventory } from "./data/inventory";

const biomes = makeBiomes(16*16);
console.log(biomes);
const app = byId("app");
app.classList.add("h-screen", "flex", "justify-center", "items-center")

const clickEvents = fromEvent(document, 'click', (e) => e.target as HTMLElement);

clickEvents.pipe(
  filter(e => e.classList.contains(Biome.trees)),
  tap(() => inventory[Biome.trees].count++),
  tap(renderInventory)
).subscribe();
  
clickEvents.pipe(
  filter(e => e.classList.contains(Biome.rocks)),
  tap(() => inventory[Biome.rocks].count++),
  tap(renderInventory)
).subscribe();

const worldEl = div(
  { className: "flex flex-wrap w-64 m-auto" },
   biomes.map(biome => Tile(biome))
);

const inventoryEl = div({ className: "w-64" });
const recipesEl = div({ className: "w64"});

function renderInventory () {
  const rows = Object.values(inventory).map((row) => div({}, [
    row.name + ":" + row.count
  ]));
  inventoryEl.replaceChildren(...rows);
}

function renderRecipe () {
  const rows =
}

app.replaceChildren(worldEl, inventoryEl);
renderInventory();