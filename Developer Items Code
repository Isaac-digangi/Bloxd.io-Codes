/*
Use in a command block in Bloxd.io worlds lobbies to be able to access developer items

(i might add the plants from grow and farm later but there's a lot)

Made by Nexo, Made better by S0MPENDER & M1DNIGHT_SV

*Strongbed and Whither Rose and no longer illegal items*

*/

api.log("made by Nexo improved by S0MPENDER and M1DNIGHT_SV");

const stackableItems = [
  	"Toxin Ball","Timed Spike Bomb Block","Water","Lava",
  	"Melting Ice","Ice Bridge","Loot Chest","Bouncy Bomb Block",
  	"Green Stone","Green Bricks","Dark Green Bricks","Dim Lamp On",
	"Dim Lamp Off", "Lily of the Valley","Azure Bluet","Sponge","Mushroom Stem",
	"Block of Quartz", "Chiseled Block of Quartz","Lapis Lazuli Ore",
	"Block of Lapis Lazuli", "Block of Emerald","Emerald Ore","Invisible Solid",
    "Fireball Block","Iceball Block","Grenade","Rocket","Super Rocket",
    "Iron Watermelon","ReservedBread BlockRotation2","Toxin Ball Block","Mystery Block",
    "Hay Bale","temp","Crate","ReservedBread BlockRotation1","ReservedBread BlockRotation3",
  	"Obby Absorb Block","Obby Absorb Death Block","Obby Death Block",
  	"Generator Spawn Block (Ore)","Generator Spawn Block (Diamond)",
  	"Generator Spawn Block (Moonstone)","Generator Spawn Block (Gray)",
  	"Finish Block","Goal Block (Red)","Goal Block (Blue)","Melting Ice|Breaking"
];

const unstackableItems = [
 	"Cornbread","Obby RPG","Timed Spike Bomb","Artisan Shears",
  	"Artisan Axe","INTERNAL_MESH_Wood Hang Glider",
	"INTERNAL_MESH_Iron Hang Glider",
  	"INTERNAL_MESH_Gold Hang Glider","INTERNAL_MESH_Diamond Hang Glider",
  	"INTERNAL_MESH_Boat","INTERNAL_MESH_Obsidian Boat","INTERNAL_MESH_Kart",
  	"INTERNAL_MESH_Blue Balloon", "One Shot Pistol"
];

const colors = [
  	"Red","Lime","Pink","Gray","Cyan","Blue","White","Brown",
  	"Green","Black","Orange","Yellow","Purple","Magenta",
  	"Light Blue","Light Gray"
];

const categories = [
  	"Balloon","Popup Tower","Paintball Gun","Heavy Paintball Gun",
  	"Paint Bow","Paintball Explosive Item","Quick Paintball Explosive Item",
  	"Sticky Paintball Explosive Item","Seeking Paintball Explosive Item"
];

const categorySingleCraft = [
  	"Paintball Gun","Heavy Paintball Gun","Paint Bow"
];

const categoryColoredBlocks = [
  	"Portal", "Paintball Explosive", "Quick Paintball Explosive",
	"Sticky Paintball Explosive", "Seeking Paintball Explosive", "Paintball"
];

for (let i = 0; i < unstackableItems.length; i++) {
  api.editItemCraftingRecipes(myId, unstackableItems[i], [{
    requires: [{ items: ["Stone"], amt: 1 }],
    produces: 1,
    station: "Potion Table"
  }]);
}

for (let i = 0; i < stackableItems.length; i++) {
  api.editItemCraftingRecipes(myId, stackableItems[i], [{
    requires: [{ items: ["Stone"], amt: 1 }],
    produces: 999,
    station: "Workbench"
  }]);
}

colors.forEach(color => {
  categoryColoredBlocks.forEach(category => {
    const itemName = `${color} ${category}`;
    api.editItemCraftingRecipes(myId, itemName, [{
      requires: [{ items: ["Stone"], amt: 1 }],
      produces: 999,
      station: "Artisan Bench"
    }]);
  });
});

colors.forEach(color => {
  categories.forEach(category => {
    const itemName = `${color} ${category}`;
    api.editItemCraftingRecipes(myId, itemName, [{
      requires: [{ items: ["Stone"], amt: 1 }],
      produces: categorySingleCraft.includes(category) ? 1 : 999,
      station: "Potion Table"
    }]);
  });
});
