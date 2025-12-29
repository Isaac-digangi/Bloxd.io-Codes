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
