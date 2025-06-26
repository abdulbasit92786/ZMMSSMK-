function getNFTDailyReward(nftType) {
  let reward = 0;
  switch (nftType) {
    case "free":
      reward = 10;
      break;
    case "starter":
      reward = 25;
      break;
    case "pro":
      reward = 60;
      break;
    case "ultra":
      reward = 120;
      break;
    case "legendary":
      reward = 250;
      break;
  }
  return reward;
}
