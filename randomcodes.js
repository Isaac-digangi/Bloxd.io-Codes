// dev / super / youtuber rank in chat messages
onPlayerChat = (playerId, chatMessage, channelName) => {

    const playerName = api.getEntityName(playerId); 
	if(playerName === "M1DNIGHT_SV"){
    api.broadcastMessage([
		/*
        {str:"[", style:{color:"#CEF3FF"}},
        {icon:"wrench", style:{color:"#A4A4A4"}},
        {str:" Dev] ", style:{color:"#CEF3FF"}},
		*/
        {str:"[", style:{color:"#CEF3FF"}},
        {icon:"youtube", style:{color:"#FE0000"}},
        {str:" You", style:{color:"white"}},
        {str:"Tuber", style:{color:"#FE0000"}},
        {str:"] ", style:{color:"#CEF3FF"}},
        {str:"[", style:{color:"#FFCC00"}},
        {icon:"zap", style:{color:"#FFCC00"}},
        {str:" Super] ", style:{color:"#FFCC00"}},
        {str: playerName, style:{color:"blue"}},
        {str:": " + chatMessage, style:{color:"white"}}
	]);
}

    return false;
};

//gliding pose
api. setPlayerPose (myId, "gliding")

//body parts removed
api.scalePlayerMeshNodes(myId, {
"TorsoNode": [0,0,0], 
"HeadMesh": [0,0,0],
"ArmRightMesh": [0,0,0], 
"ArmLeftMesh": [0,0,0], 
"LegLeftMesh": [1,1,1],
"LegRightMesh": [1,1,1],
}); //only legs

//random teleport code anywhere from -30k to 30k
//world code
function randTeleport(){

function randCoord(limit) {
    return Math.floor(Math.random() * (limit * 2 + 1)) - limit;
}

let maxRange = 30000; // your chosen limit

let x = randCoord(maxRange);
let y = 25;
let z = randCoord(maxRange);

api.setPosition(myId, [x, y, z]);
}

//code block
randTeleport();



//send icons as a flying middle message
api.sendFlyingMiddleMessage(myId, [{icon: "Gold Spade", style: {fontSize: "500px"}}], 1000)



//totem icon display (needs to be edited for world code)

// Track all active totem animations
const totemAnimations = {};

// Start the animation for a player
function playTotemAnimation(playerId) {
    totemAnimations[playerId] = {
        frame: 0,
        ticks: 0,
        frames: [
            { opacity: 1.0, duration: 5 },
            { opacity: 0.7, duration: 5 },
            { opacity: 0.4, duration: 5 },
            { opacity: 0.1, duration: 5 }
        ]
    };
}

// Update animations every tick
api.onTick(() => {
    for (const playerId in totemAnimations) {
        const anim = totemAnimations[playerId];
        const frame = anim.frames[anim.frame];

        // Display the icon for this frame
        api.sendFlyingMiddleMessage(playerId, [
            { icon: "totem", style: { opacity: frame.opacity } }
        ], frame.duration * 50); // convert ticks → ms

        anim.ticks++;

        // Move to next frame
        if (anim.ticks >= frame.duration) {
            anim.frame++;
            anim.ticks = 0;

            // Animation finished
            if (anim.frame >= anim.frames.length) {
                delete totemAnimations[playerId];
            }
        }
    }
});

// Trigger revive + animation on death
api.onPlayerDeath((playerId) => {
    // Revive the player
    api.setHealth(playerId, 20);

    // Play magical sound
    api.playSound(playerId, "harp_pling", 1, 1);

    // Start the animation
    playTotemAnimation(playerId);
});


//automatic opening door :D
onBlockStand = (playerId, x, y, z, blockName) => { 
	if(blockName === "Block of Gold"){ 
		api.setBlock([599, 7, 22000], "Maple Door|meta|rot4|open") 
	}else{ api.setBlock([599, 7, 22000], "Maple Door|meta|rot4|closed") } 
}

//send log of mob drops when mob spawns
onPlayerSpawnMob = (playerId, mobId, mobType, x, y, z, mobHerdId, playSoundOnSpawn) => {
	const drops = api.getMobSetting(mobId, "onDeathItemDrops", true);
    api.log("Mob drops: " + JSON.stringify(drops))
}

//editing of crafting recipes

api.editItemCraftingRecipes(myId, "Moonstone", [{
		requires: [
			{ items: ["Diamond"], amt: 1 }],
		produces: 1,
		station: "Furnace"
	}
]);

//world code for hardcore mode (automatically kick players on death and join

let banned = []

onPlayerKilledOtherPlayer = (attacker, killed, damage, item) => {
playerName = api.getEntityName(killed)
    if (!banned.includes(killed.id)) {
        banned.push(killed.id)
    }
    api.kickPlayer(killed, "You died in hardcore mode and cannot rejoin")
	api.broadcastMessage(playerName + " has died and cannot rejoin", {color:"Red"})
}

onMobKilledPlayer = (attacker, killed, damage, item) => {
    if (!banned.includes(killed.id)) {
        banned.push(killed.id)
    }
    api.kickPlayer(killed, "You died in hardcore mode and cannot rejoin")
	api.broadcastMessage(playerName + " has died and cannot rejoin", {color:"Red"})
}

onPlayerJoin = (player) => {
    if (banned.includes(player.id)) {
        api.kickPlayer(player, "You died in hardcore mode and cannot rejoin")
		api.broadcastMessage(playerName + " has died and cannot rejoin", {color:"Red"})
    }
}
