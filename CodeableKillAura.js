//not sure if this works lol i havent tested it yet :|

api.log("Transcribed by: M1DNIGHT_SV");

const dealMeleeDamage = (hittingId) => {
  const playerPosition = api.getPosition(hittingId);
  const playerIds = api.getPlayerIds();

  for (const targetId of playerIds) {
      if (targetId !== hittingId) {
        const targetPosition = api.getPosition(targetId);
        const distance = Math.sqrt(
          Math.pow(playerPosition[0] - targetPosition[0], 2) +
          Math.pow(playerPosition[1] - targetPosition[1], 2) +
          Math.pow(playerPosition[2] - targetPosition[2], 2)
        );

        if (distance < 5) {
          api.applyMeleeHit(hittingId, targetId, [0,0,0]);
        }
    }
}
};