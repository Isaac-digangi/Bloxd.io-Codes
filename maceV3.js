api.giveItem(myId, "Artisan Axe", 1, {customDisplayName: "Mace", customAttributes:{enchantmentTier: "Tier 4"}});

const fallStartY = {};

function tick() {
    const players = api.getPlayerIds();
    for (const id of players) {
        const vel = api.getVelocity(id);
        const pos = api.getPosition(id);

        if (!vel || !pos) continue;

        const isFalling = vel[1] < -0.1;

        if (isFalling) {
            if (fallStartY[id] === undefined) {
                fallStartY[id] = pos[1];
            }
        } else {
            delete fallStartY[id];
        }
    }
};

function onPlayerDamagingMob(attackerId, targetId, damageAmount, itemName) {
    try {
        const heldItem = api.getHeldItem(attackerId);
        if (!heldItem) return;

        const isMace =
            heldItem?.name === "Artisan Axe" &&
            heldItem?.attributes?.customDisplayName === "Mace";

        if (!isMace) return;

        const effects = api.getEffects(attackerId);
        const hasCooldown = effects?.some(e => e.type === "Mace Cooldown");
        if (hasCooldown) return;

        // Must have a stored fall height
        const startY = fallStartY[attackerId];
        if (startY === undefined) return;

        const attackerPos = api.getPosition(attackerId);
        const currentY = attackerPos[1];

        const fallDistance = Math.max(0, startY - currentY);

        if (fallDistance < 1) return;
        //makes the weapon more op lol
        const damage = Math.ceil(fallDistance * 2);

        api.applyHealthChange(targetId, -damage, attackerId);
		api.log("damage dealt: " + damage);

        api.applyEffect(targetId, "Slowness", 3000, {
            icon: "Slowness",
            displayName: "Slammed",
            inbuiltLevel: 2
        });

        api.applyEffect(attackerId, "Mace Cooldown", 1600, {
            icon: "Frozen",
            displayName: "Mace Cooldown"
        });

        api.setVelocity(attackerId, 0, 30, 0);

        // Particles
        const [x, y, z] = api.getPosition(targetId);
        api.playParticleEffect({
            dir1: [-3, -3, -3],
            dir2: [3, 3, 3],
            pos1: [x - 3, y, z - 3],
            pos2: [x + 3, y + 3, z + 3],
            texture: "glint",
            minLifeTime: 0.3,
            maxLifeTime: 1,
            minEmitPower: 3,
            maxEmitPower: 5,
            minSize: 0.3,
            maxSize: 0.7,
            manualEmitCount: 100,
            gravity: [0, -5, 0],
            colorGradients: [
                {
                    timeFraction: 0,
                    minColor: [180, 180, 180, 1],
                    maxColor: [255, 255, 255, 1]
                }
            ],
            velocityGradients: [
                {
                    timeFraction: 0,
                    factor: 1,
                    factor2: 1
                }
            ],
            blendMode: 1
        });

        // Reset fall start so it doesn't repeat
        delete fallStartY[attackerId];

    } catch (err) {
        api.log("Error in Mace damage:", err);
    }
}

onPlayerDamagingOtherPlayer = (attackingPlayer, damagedPlayer, damageDealt, withItem, bodyPartHit, damagerDbId) => {
    try {
        const heldItem = api.getHeldItem(attackingPlayer);
        if (!heldItem) return;

        const isMace =
            heldItem?.name === "Artisan Axe" &&
            heldItem?.attributes?.customDisplayName === "Mace";

        if (!isMace) return;

        const effects = api.getEffects(attackingPlayer);
        const hasCooldown = effects?.some(e => e.type === "Mace Cooldown");
        if (hasCooldown) return;

        const startY = fallStartY[attackingPlayer];
        if (startY === undefined) return;

        const attackerPos = api.getPosition(attackingPlayer);
        const currentY = attackerPos[1];
      
        const fallDistance = Math.max(0, startY - currentY);

        if (fallDistance < 1) return;

        const damage = Math.ceil(fallDistance * 2);

        api.applyHealthChange(damagedPlayer, -damage, attackingPlayer);
        api.log("PVP slam damage dealt: " + damage);

        api.applyEffect(damagedPlayer, "Slowness", 3000, {
            icon: "Slowness",
            displayName: "Slammed",
            inbuiltLevel: 2
        });

        api.applyEffect(attackingPlayer, "Mace Cooldown", 1600, {
            icon: "Frozen",
            displayName: "Mace Cooldown"
        });

        api.setVelocity(attackingPlayer, 0, 30, 0);

        const [x, y, z] = api.getPosition(damagedPlayer);
        api.playParticleEffect({
            dir1: [-3, -3, -3],
            dir2: [3, 3, 3],
            pos1: [x - 3, y, z - 3],
            pos2: [x + 3, y + 3, z + 3],
            texture: "glint",
            minLifeTime: 0.3,
            maxLifeTime: 1,
            minEmitPower: 3,
            maxEmitPower: 5,
            minSize: 0.3,
            maxSize: 0.7,
            manualEmitCount: 100,
            gravity: [0, -5, 0],
            colorGradients: [
                {
                    timeFraction: 0,
                    minColor: [180, 180, 180, 1],
                    maxColor: [255, 255, 255, 1]
                }
            ],
            velocityGradients: [
                {
                    timeFraction: 0,
                    factor: 1,
                    factor2: 1
                }
            ],
            blendMode: 1
        });

        delete fallStartY[attackingPlayer];

    } catch (err) {
        api.log("Error in PVP Mace damage:", err);
    }
};
