const playerSchema = require("./player");
const uid = function () {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
  let counter = 0;
  while (counter < 8) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
}


console.log(uid())
class Room {
  constructor() {
    this.id = uid();
    this.occupancy = 2; // Nombre d'occupants de la room
    this.maxRounds = 3; // Nombre de rounds maximum par room
    this.currentRound = 1; // Round actuel
    this.players = []; // Liste des joueurs
    this.isJoin = true; // Permet de rejoindre la room
    this.turn = {}; // Joueur actuel
    this.turnIndex = 0; // Index du joueur actuel
  }

  addPlayer(player) {
    if (this.players.length < this.occupancy) {
      this.players.push(player);
      return true; // Le joueur a été ajouté avec succès
    }
    return false; // La salle est pleine
  }

  nextTurn() {
    this.turnIndex = (this.turnIndex + 1) % this.players.length;
    this.turn = this.players[this.turnIndex];
  }
}

module.exports = Room;
