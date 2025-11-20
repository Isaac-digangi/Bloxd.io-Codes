// CODE BLOCK__________________
let moonstoneToRemove = 2;
let diamondToRemove = 1;

let moonstoneCount = 0;
let diamondCount = 0;

// First pass: count items
for (let i = 0; i <= 44; i++) {
  let item = api.getItemSlot(myId, i);
  if (!item || !item.name) continue;

  if (item.name === "Moonstone") {
    moonstoneCount += item.amount;
  } else if (item.name === "Diamond") {
    diamondCount += item.amount;
  }
}

// Check if player has enough of each
if (moonstoneCount >= moonstoneToRemove && diamondCount >= diamondToRemove) {
  let moonstoneRemoved = 0;
  let diamondRemoved = 0;

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

  // Remove Diamonds
  for (let i = 0; i <= 44; i++) {
    if (diamondRemoved >= diamondToRemove) break;
    let item = api.getItemSlot(myId, i);
    if (item && item.name === "Diamond") {
      let needed = diamondToRemove - diamondRemoved;
      if (item.amount > needed) {
        api.setItemSlot(myId, i, item.name, item.amount - needed, item.attributes);
        diamondRemoved = diamondToRemove;
      } else {
        diamondRemoved += item.amount;
        api.setItemSlot(myId, i, "", 0, {});
      }
    }
  }

  // Give Wind Charge
  api.giveItem(myId, "Moonstone Fragment", 6, {
    customDisplayName: "Wind Charge",
    customDescription: "Use on the ground for a boost!"
  });
  api.sendFlyingMiddleMessage(myId, ["Wind Charges crafted :D"], 1000);
} else {
  api.sendMessage(myId, "You need 2 Moonstones and 1 Diamond to craft a Wind Charge.");
}

//WORLD CODE_____________

const lastGrounded = {};

onBlockStand = (playerId, x, y, z, blockName) => {
  lastGrounded[playerId] = Date.now();
};

onPlayerClick = (id, alt) => {
  const slotidx = api.getSelectedInventorySlotI(id);
  const itm = api.getItemSlot(id, slotidx);

  if (itm !== null && itm.attributes?.customDisplayName === "Wind Charge") {
    const now = Date.now();
    const last = lastGrounded[id] || 0;

    if (now - last > 175) {
      return;
    }

    api.setVelocity(id, 0, 20, 0);
    api.removeItemName(id, "Moonstone Fragment", 1);

    const pos = api.getPosition(id);
    const x = pos[0];
    const y = pos[1];
    const z = pos[2];

    api.playParticleEffect({
      dir1: [-2, -1, -2],
      dir2: [2, 2, 2],
      pos1: [x - 1, y + 1, z - 1],
      pos2: [x + 1, y + 2, z + 1],
      texture: "drift",
      minLifeTime: 0.2,
      maxLifeTime: 0.6,
      minEmitPower: 2,
      maxEmitPower: 6,
      minSize: 0.25,
      maxSize: 0.4,
      manualEmitCount: 60,
      gravity: [0, -10, 0],
      colorGradients: [
        {
          timeFraction: 0,
          minColor: [100, 100, 100, 1],
          maxColor: [180, 180, 180, 1],
        },
      ],
      velocityGradients: [
        {
          timeFraction: 0,
          factor: 1,
          factor2: 1.2,
        },
      ],
      blendMode: 1,
    });
  }
};