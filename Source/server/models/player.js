class Player {
  constructor(nickname, socketID, playerType) {
    this.nickname = nickname;
    this.socketID = socketID;
    this.points = 0;
    this.playerType = playerType;
  }
}

module.exports = Player;
