//CODE BLOCK_________
let goldBlockToRemove = 1;
let moonstoneToRemove = 2;

let goldBlockCount = 0;
let moonstoneCount = 0;

// First pass: count items
for (let i = 0; i <= 44; i++) {
  let item = api.getItemSlot(myId, i);
  if (!item || !item.name) continue;

  if (item.name === "Block of Gold") {
    goldBlockCount += item.amount;
  } else if (item.name === "Moonstone") {
    moonstoneCount += item.amount;
  }
}

// Check if player has enough of each
if (goldBlockCount >= goldBlockToRemove && moonstoneCount >= moonstoneToRemove) {
  let goldBlockRemoved = 0;
  let moonstoneRemoved = 0;

  // Remove Block of Gold
  for (let i = 0; i <= 44; i++) {
    if (goldBlockRemoved >= goldBlockToRemove) break;
    let item = api.getItemSlot(myId, i);
    if (item && item.name === "Block of Gold") {
      let needed = goldBlockToRemove - goldBlockRemoved;
      if (item.amount > needed) {
        api.setItemSlot(myId, i, item.name, item.amount - needed, item.attributes);
        goldBlockRemoved = goldBlockToRemove;
      } else {
        goldBlockRemoved += item.amount;
        api.setItemSlot(myId, i, "", 0, {});
      }
    }
  }

  // Remove Moonstones
  for (let i = 0; i <= 44; i++) {
    if (moonstoneRemoved >= moonstoneToRemove) break;
    let item = api.getItemSlot(myId, i);
    if (item && item.name === "Moonstone") {
      let needed = moonstoneToRemove - moonstoneRemoved;
      if (item.amount > needed) {
        api.setItemSlot(myId, i, item.name, item.amount - needed, item.attributes);
        moonstoneRemoved = moonstoneToRemove;
      } else {
        moonstoneRemoved += item.amount;
        api.setItemSlot(myId, i, "", 0, {});
      }
    }
  }

  // Give Totem of Undying (as a renamed Gold Coin)
  api.giveItem(myId, "Gold Coin", 1, {
    customDisplayName: "Totem of Undying",
    customDescription: "Revives you once when you take fatal damage"
  });
  api.sendFlyingMiddleMessage(myId, ["Totem of Undying crafted!"], 1000);
} else {
  api.sendMessage(myId, "You need 1 Block of Gold and 2 Moonstones to craft a Totem of Undying.");
}

//WORLD CODE ______ (unfinished)