api.log("Made by: BluePandaBloxd, Transcribed by: M1DNIGHT_SV");

function onPlayerCraft(playerId, itemName, craftingIdx){
 if(itemName === "Iron Pickaxe"){
api.sendTopRightHelper(playerId, "crown", "Advancement Made! Isn't it iron pick?", {duration:5, height:85, width:300, color:"#32c433", iconSizeMult:1, textAndIconColor:"#FFFFFF", fontSize:"18px"})
 }
 if(itemName === "Wood Hang Glider" || itemName === "Iron Hang Glider" || itemName === "Gold Hang Glider" || itemName === "Diamond Hang Glider"){
api.sendTopRightHelper(playerId, "crown", "Advancement Made! Sky's The Limit", {duration:5, height:85, width:300, color:"#e024e8", iconSizeMult:1, textAndIconColor:"#FFFFFF", fontSize:"18px"})
 }
}

function onPlayerPickedUpItem(playerId, itemName, itemAmount){
 if(itemName === "Diamond"){
  api.sendTopRightHelper(playerId, "crown", "Advancement Made! Diamonds!", {duration:5, height:85, width:300, color:"#2cc3d9", iconSizeMult:1, textAndIconColor:"#FFFFFF", fontSize:"18px"})
 }
 else if(itemName === "Lava Bucket"){
  api.sendTopRightHelper(playerId, "crown", "Advancement Made! Hot Stuff!", {duration:5, height:85, width:300, color:"#f08e11", iconSizeMult:1, textAndIconColor:"#FFFFFF", fontSize:"18px"})
 }
 else if(itemName === "Moonstone"){
  api.sendTopRightHelper(playerId, "crown", "Advancement Made! To The Moon!", {duration:5, height:85, width:300, color:"#a3d7f7", iconSizeMult:1, textAndIconColor:"#FFFFFF", fontSize:"18px"})
 }
}