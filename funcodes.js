//dev / super / youtuber rank in chat messages
api.broadcastMessage([{str:"[", style:{color:"#CEF3FF"}}, {icon:"wrench", style:{color:"#A4A4A4"}}, {str:" Dev] ", style:{color:"#CEF3FF"}}, {str:"[", style:{color:"#CEF3FF"}}, {icon:"youtube", style:{color:"#FE0000"}}, {str:" You", style:{color:"white"}}, {str:"Tuber", style:{color:"#FE0000"}}, {str:"] ", style:{color:"#CEF3FF"}}, {str:"[", style:{color:"#FFCC00"}}, {icon:"zap", style:{color:"#FFCC00"}}, {str:" Super] ", style:{color:"#FFCC00"}}, {str:api.getEntityName(myId), style:{color:"#DFF8FF"}}, {str:": lol", style:{color:"#DFF8FF"}}])

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

