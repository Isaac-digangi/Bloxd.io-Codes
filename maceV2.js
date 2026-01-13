function onPlayerDamagingMob(attackerId, targetId, damageAmount, itemName) {
    try {
        const heldItem = api.getHeldItem(attackerId)
        if (!heldItem) return

        // Check for Mace custom item
        if (heldItem?.name === "Artisan Axe" && 
    heldItem?.attributes?.customDisplayName === "Mace") {


            const attackerPos = api.getPosition(attackerId)

            // Trigger slam only if attacker is slightly airborne
            if (attackerPos[1] - Math.floor(attackerPos[1]) > 0.1) {
                // Deal bonus damage directly
                api.applyHealthChange(targetId, -20, attackerId)

                // Apply Slowness effect to the target
                api.applyEffect(targetId, "Slowness", 5000, {
                    icon: "Slowness",
                    displayName: "Slammed",
                    inbuiltLevel: 2
                })

                // Launch attacker upward to give slam effect
                api.setVelocity(attackerId, 0, 20, 0)

                // Particle effect at target
                const [x, y, z] = api.getPosition(targetId)
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
                })

                // Prevent default damage to avoid doubling
                return "preventDamage"
            }
        }
    } catch (err) {
        api.log("Error in Mace damage:", err)
    }
}

function onPlayerDamagingOtherPlayer(attackerId, targetId, damageAmount, itemName, bodyPart) {
    try {
        const heldItem = api.getHeldItem(attackerId)
        if (!heldItem) return

        // Check for Mace custom item
        if (heldItem === "Artisan Axe" && heldItem?.attributes?.customDisplayName === "Mace") {
            const attackerPos = api.getPosition(attackerId)

            // Trigger slam only if attacker is slightly airborne
            if (attackerPos[1] - Math.floor(attackerPos[1]) > 0.1) {
                // Deal bonus damage directly
                api.applyHealthChange(targetId, -20, attackerId)

                // Apply Slowness effect to the target
                api.applyEffect(targetId, "Slowness", 5000, {
                    icon: "Slowness",
                    displayName: "Slammed",
                    inbuiltLevel: 2
                })

                // Launch attacker upward to give slam effect
                api.setVelocity(attackerId, 0, 20, 0)

                // Particle effect at target
                const [x, y, z] = api.getPosition(targetId)
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
                })

                // Prevent default damage to avoid doubling
                return "preventDamage"
            }
        }
    } catch (err) {
        api.log("Error in Mace damage:", err)
    }
}
