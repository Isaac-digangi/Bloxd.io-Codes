
/* code for a wind charge (not complete)
const lastGrounded = {};

function onBlockStand(playerId, x, y, z, blockName) {
	lastGrounded[playerId] = Date.now();
}

function onPlayerClick(id, alt) {
	const slotidx = api.getSelectedInventorySlotI(id);
	const itm = api.getItemSlot(id, slotidx);

	if (itm !== null && itm.attributes?.customDisplayName === "Wind Charge") {
		const now = Date.now();
		const last = lastGrounded[id] || 0;

		if (now - last > 175) {
			return;
		}

		api.setVelocity(id, 0, 20, 0);
		api.removeI\u{74}emName(id, "Moonstone Fragment", 1)

		const [x, y, z] = api.getPosition(id);
		const py = y + 1;

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
}

*/
q=3

roll_p={}
htc = {}
lh={}
track=[]
moon_orb = []
cool_endp={}
midd={}
kc={}
cnt = 0
cooldown=[]
cooldownL=[]
cooldownF=[]
cooldownU=[]
heights=[]
function p1(x,y,z){
api.playParticleEffect({
    dir1: [0, -8, 0],
    dir2: [0, 3, 0],
    pos1: [x-4, y, z-4],
    pos2: [x + 4, y, z + 4],
    texture: "square_particle",
    minLifeTime: 0.2,
    maxLifeTime: 0.6,
    minEmitPower: 2,
    maxEmitPower: 2,
    minSize: 0.1,
    maxSize: 0.2,
    manualEmitCount: 400,
    gravity: [0, -10, 0],
    colorGradients: [
        {
            timeFraction: 0,
            minColor: [100,100, 100, 1],
            maxColor: [150, 150, 150, 1],
        },
    ],
    velocityGradients: [
        {
            timeFraction: 0,
            factor: 2,
            factor2: 2,
        },
    ],
    blendMode: 1,
})
}
function p2(x,y,z){
api.playParticleEffect({
    dir1: [-1, -1, -1],
    dir2: [1, 1, 1],
    pos1: [x-1, y-1, z-1],
    pos2: [x + 1, y+1, z + 1],
    texture: "soul_0",
    minLifeTime: 0.2,
    maxLifeTime: 0.6,
    minEmitPower: 2,
    maxEmitPower: 2,
    minSize: 0.25,
    maxSize: 0.5,
    manualEmitCount: 400,
    gravity: [0, 0, 0],
    colorGradients: [
        {
            timeFraction: 0,
            minColor: [255,0, 0, 1],
            maxColor: [150, 0, 0, 1],
        },
    ],
    velocityGradients: [
        {
            timeFraction: 0,
            factor: 1,
            factor2: 1,
        },
    ],
    blendMode: 1,
})
}
function p3(x,y,z){
	api.playParticleEffect({
		dir1: [-1, -1, -1],
		dir2: [1, 1, 1],
		pos1: [x-1, y, z-1],
		pos2: [x + 1, y+1, z + 1],
		texture: "glint",
		minLifeTime: 0.5,
		maxLifeTime: 1,
		minEmitPower: 2,
		maxEmitPower: 2,
		minSize: 0.25,
		maxSize: 0.5,
		manualEmitCount: 100,
		gravity: [0, 0, 0],
		colorGradients: [
			{
				timeFraction: 0,
				minColor: [0,255, 0, 1],
				maxColor: [0, 150, 0, 1],
			},
		],
		velocityGradients: [
			{
				timeFraction: 0,
				factor: 1,
				factor2: 1,
			},
		],
		blendMode: 1,
	})
	api.playParticleEffect({
		dir1: [-1, -1, -1],
		dir2: [1, 1, 1],
		pos1: [x-1, y, z-1],
		pos2: [x + 1, y+1, z + 1],
		texture: "glint",
		minLifeTime: 0.5,
		maxLifeTime: 1,
		minEmitPower: 2,
		maxEmitPower: 2,
		minSize: 0.25,
		maxSize: 0.5,
		manualEmitCount: 100,
		gravity: [0, 0, 0],
		colorGradients: [
			{
				timeFraction: 0,
				minColor: [255,255, 0, 1],
				maxColor: [255, 255, 0, 1],
			},
		],
		velocityGradients: [
			{
				timeFraction: 0,
				factor: 1,
				factor2: 1,
			},
		],
		blendMode: 1,
	})
	
}
combo=[]
owner="nBQYMuUKlJ70CgpqNUbVL"
playerMeta = []
midas = "Levels Up With Each Kill!"
a=[[-86.5,24,395.5],[-128.5,24,406.5],[-170.5,24,395.5],[-202.5,24,363.5],[-213.4,24,321.5],[-202.5, 24, 279.5],[-170.5,24,247.5],[-128.5,24,236.5],[-86.5,24,257.5],[-54.5,24,279.5],[-43.5,24,321.5],[-54.5,24,363.5]]
function soun(id){
api.playSound(id, "submachine_tail_only_shot_01",1, 1)
}
function getDis([x,y,z],[x1,y1,z1]){
    
    return Math.sqrt(Math.pow(x-x1,2)+Math.pow(y-y1,2)+Math.pow(z-z1,2))
}
function onPlayerClick(id, alt){
	slotidx = api.getSelectedInventorySlotI(id)
	itm = api.getItemSlot(id, slotidx)
	
	slotidx= api.getSelectedInventorySlotI(id)
	i\u{74}m = api.get\u{49}temSlot(id, slotidx)
	/*api.broadcastMessage(itm)*/
	
	if (i\u{74}m !== null){
	if (i\u{74}m.attributes.customDisplayName==="Downdraft"){
		api.setVelocity(id, 0,-20,0)
	}
	if (i\u{74}m.attributes.customDisplayName==="Extra Life" && alt && !api.getEffects(id).includes("Extra Life")){
		api.applyEffect(id, "Extra Life", null, {displayName: "Extra Life", icon:"Gold Spade"})
		/*api.removeI\u{74}emName(id, "Gold Spade", 1)*/
		api.setItemSlot(id, slotidx, "Gold Spade", 0)
	}
	}
}
function onPlayerDamagingOtherPlayer(id,id1,dmg,itm){
	
	item=itm
	dir=api.getPlayerFacingInfo(id).angleDir
    dir1 = api.getPlayerFacingInfo(id1).angleDir
    sel=api.getItemSlot(id1,api.getSelectedInventorySlotI(id1))
    if (api.isPlayerCrouching(id1) && sel && sel.attributes.customDisplayName==="Shield Generator" && !api.getEffects(id1).includes("Shield Cooldown")){
        sel1=api.getItemSlot(id,api.getSelectedInventorySlotI(id))
		api.log(sel1)
		if (sel1.name === "Diamond Axe"){
            api.applyEffect(id1,"Shield Cooldown", 5000, {icon:"Aspen Door"})
        }
        if (Math.abs((dir.theta-Math.PI)-dir1.theta) < 1.117){
            return "preventDamage"
        }else if (Math.abs((dir.phi-Math.PI)-dir1.phi) < 1.5){

            return "preventDamage"
        }
        
    }
	poser = api.getPosi\u{74}ion(id1)
	tth = pa\u{72}seInt(Math.abs(heights[id]-poser[1]))
	tth1 = pa\u{72}seInt(Math.abs(heights[id]-lh[id]))
	api.removeEffect(id, "Mace Combo")
	if (item && i\u{74}em==="Moonstone Axe" && cooldown[id] === 0 && (tth>3 || tth1 > 3)){
		api.setVeloci\u{74}y(id, 0,10,0)
		api.setVeloci\u{74}y(id, 0,18,0)
		api.setVeloci\u{74}y(id1, 0,10,0)
		
		soun(id1)
		soun(id)
		if (tth < 4){


			
			chaneH = -(10*tth)

			
		}else if (tth < 7){
			chaneH = -(7*tth)

		}else{
			chaneH = -(3*tth)

		}
		combo[id]+=1
		
		api.applyEffect(id, "Mace Combo", null, {displayName:"x"+combo[id]+" Mace Chain", icon:"Moonstone Axe"})
		if (api.getHealth(id1)+chaneH < 5 && api.getEffects(id1).includes("Extra Life")){
			api.setHealth(id1, 10)
			api.applyEffect(id1, "Health Regen", 40000, {inbuiltLevel:2})
			api.setShieldAmount(id1, 20)
			api.playSound(id1, "ca\u{73}hRegister",1, 1)
			api.applyEffect(id1, "Extra Life", 1, {displayName: "Extra Life", icon:"Gold Spade"})
			p3(poser[0],poser[1],poser[2])	
		}else{
			api.applyHealthChange(id1, chaneH,id)
			p1(poser[0],poser[1],poser[2])

		}
		cooldownU[id1]=2*20
		api.applyEffect(id1,"Unflyable",2000,{icon:"Cobweb"})
		
	}else if (item && i\u{74}em==="Moonstone Axe" && cooldown[id] > 0){
		api.setHealth(id1, api.getHealth(id1)+dmg)
	}
	
    if (i\u{74}em==="Stone Hoe" && cooldownL[id] === 0){
		if (api.getHealth(id1)-dmg < 5 && api.getEffects(id1).includes("Extra Life")){
			api.setHealth(id1, 10)
			api.applyEffect(id1, "Health Regen", 25000, {inbuiltLevel:2})
			api.setShieldAmount(id1, 20)
			api.playSound(id1, "ca\u{73}hRegister",1, 1)
			api.applyEffect(id1, "Extra Life", 1, {displayName: "Extra Life", icon:"Gold Spade"})
			p3(poser[0],poser[1],poser[2])	
		}else{
			api.playSound(id, "sweep6",1, 1)
			api.playSound(id1, "sweep6",1, 1)
			api.applyHealthChange(id1, -dmg ,id)
			api.applyHealthChange(id, dmg*2, id1)
			p2(poser[0],poser[1],poser[2])
		}
	}
    cooldown[id]=2
	cooldownL[id]=8
	cooldownF[id]=0
	if (api.getEffects(id1).includes("Extra Life")  && api.getHealth(id1)-dmg < 5){
        poser = api.getPosi\u{74}ion(id1)
        api.setHealth(id1, 10)
        api.applyEffect(id1, "Health Regen", 40000, {inbuiltLevel:2})
        api.setShieldAmount(id1, 20)
        api.playSound(id1, "ca\u{73}hRegister",1, 1)
        api.removeEffect(id1, "Extra Life")
        p3(poser[0],poser[1],poser[2])
        
        

    }
}
function tick(){
	cnt+=1
	players=api.getPlayerIds()
	for (i=0;i<players.length;i++){
		if(api.isPlayerCrouching(players[i]) && !api.getEffects(players[i]).includes("Shield Cooldown")){
			sel=api.getItemSlot(players[i],api.getSelectedInventorySlotI(players[i]))
            
			if (sel && sel.attributes.customDisplayName==="Shield Generator"){
				api.updateEntityNodeMeshAttachment(players[i], "HeadMesh", "BloxdBlock", {blockName:"Aspen Door", size:.8, meshOffset:[0, 0, 0]}, [0,-0.4,0.8], [0,0,0])
			}else{
                api.updateEntityNodeMeshAttachment(players[i], "HeadMesh", "BloxdBlock", {blockName:"Air", size:.8, meshOffset:[0, 0, 0]}, [0,0,0], [0,0,0])
            }
		}else{
            
			api.updateEntityNodeMeshAttachment(players[i], "HeadMesh", "BloxdBlock", {blockName:"Air", size:.8, meshOffset:[0, 0, 0]}, [0,0,0], [0,0,0])
			
        }
		playerMeta[players[i]]=  {"pos":api.getPosi\u{74}ion(players[i]), "killStreak":api.getCurrentKillstreak(players[i])}
		new_pos = playerMeta[players[i]].pos[1]
		if (cooldownU[players[i]] > 0){
			cooldownU[players[i]]-=1
			
			if (new_pos > heights[players[i]]){
				
				api.setPosition(players[i], api.getPosi\u{74}ion(players[i])[0],heights[players[i]],api.getPosi\u{74}ion(players[i])[2])
				
		
			}
		}
		if (new_pos > heights[players[i]]){
			heights[players[i]] = new_pos
		}
		
		if (cnt % 10 === 0){
		if ((cooldown[players[i]] > 0)){
			cooldown[players[i]]-=1
		}
		if ((cooldownL[players[i]] > 0)){
			cooldownL[players[i]]-=1
		}
		
		
	
		}
		
		
	}

}
function onBlockStand(id){
	
	heights[id] = api.getPosi\u{74}ion(id)[1]
	lh[id] = api.getPosi\u{74}ion(id)[1]
	combo[id] = 0
	api.setPlayerPose(id, "standing")
}
function playerCommand(id, cmd){

	splt = cmd.split(" ")
	if (api.getPlayerDbId(id) === owner){
		if (splt){

			if (splt[0]==="getDbId" && splt[1]){
				api.sendMessage(id, splt[1]+"'s DBID: "+api.getPlayerDbId(api.getPlayerId(splt[1])))
				return true
			}
			if (splt[0]==="setOption" && splt[1] && splt[2] && splt[3]){
				vale=splt[3]
				if (splt[2]==="number"){
					vale=Number(vale)
				}else if (splt[2]==="str"){
					vale=vale.toString()
				}else if (splt[2]==="bool"){
					vale=eval(vale)
				}
				api.setClientOption(id, splt[1],vale)
				api.sendMessage(id, "Set Option "+splt[1]+" to "+vale)
				return true
			}
			if (splt[0]==="code"){
				api.setPosition(id, -128.5, 47, 230.5)
				return true
			}
			if (splt[0]==="eval"){
				eval(splt[1])
				return true
			}
			if (splt[0]==="kickall" && splt[1]){
				api.getPlayerIds().forEach(id=>{
					api.kickPlayer(id, splt[1])
				})
				return true
			}
			if (splt[0]==="kickallnoadmin" && splt[1]){
				api.getPlayerIds().forEach(id1=>{
					if (id!==id1){
						api.kickPlayer(id, splt[1])
					}
				})
				return true
			}
		}
	}
}
tools = [["Moonstone Axe",1],["Moonstone Fragment",1],["Wood Hang Glider",1], ["Obby RPG",1],["Stone Hoe",1],["Steak",20],["Gold Spade",1],["Gold Spade",1],["Gold Spade",1],["Iron Crossbow",1]]

function onPlayerJoin(id){
	cooldown[id]=0
	heights[id] = 0

	api.applyEffect(id, "Slowness", null, {icon:"Slowness",displayName:"Stunned",inbuiltLevel:1})
	for (i=0;i<tools.length;i++){
		if (tools[i][0]==="Moonstone Axe"){
		api.set\u{49}temSlot(id, i, tools[i][0], tools[i][1], {"customDisplayName": "The Mace", "customDescription": "The higher you fall, the more the damage. Enchantment: Wind burst"})
		}else if (tools[i][0]==="Stone Hoe"){
			api.set\u{49}temSlot(id, i, tools[i][0], tools[i][1], {"customDisplayName": "The Lifesteal Scynth", "customDescription": "Steal Hearts from others by attacking them!"})
		}else if (tools[i][0]==="Gold Spade"){
			api.set\u{49}temSlot(id, i, tools[i][0], tools[i][1], {"customDisplayName": "Extra Life", "customDescription": "Wi\u{74}h a Twist!"})
		}else if (tools[i][0]==="Moonstone Fragment"){
			api.set\u{49}temSlot(id, i, tools[i][0], tools[i][1], {"customDisplayName": "Downdraft", "customDescription": "Get down FAST!"})
		}else if (tools[i][0]==="Iron Crossbow"){
			api.set\u{49}temSlot(id, i, tools[i][0], tools[i][1], {"customDisplayName": "Shield Generator", "customDescription": "Crouch to activate shield!"})
		}else{
			api.set\u{49}temSlot(id, i, tools[i][0],tools[i][1])
		}
	}
    api.set\u{49}temSlot(id, 6, "Diamond Axe", null)
	api.set\u{49}temSlot(id, 46, "Diamond Helmet", null);
	api.set\u{49}temSlot(id, 47, "Diamond Chestplate", null);
	api.set\u{49}temSlot(id, 48, "Diamond Gauntlets", null);
	api.set\u{49}temSlot(id, 49, "Diamond Leggings", null);
	api.set\u{49}temSlot(id, 50, "Diamond Boots", null);
	/*api.updateEntityNodeMeshAttachment(id, "ArmLeftMesh", "BloxdBlock", {blockName:"Aspen Door", size:.6, meshOffset:[0, 0, 0]}, [0.1, -.5,  0], [0,3.14/2,3.14/2])*/
	
}
