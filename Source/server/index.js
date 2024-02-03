// importing modules
const express = require("express");
const http = require("http");

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const Room = require("./models/room");
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }
});



// middle ware
app.use(express.json());

const rooms = [];

io.on("connection", (socket) => {
  console.log("connected!");

  socket.on("createRoom", async ({ nickname }) => {
    console.log(nickname);
    try {
      // room is created
      let room = new Room();
      let player = {
        socketID: socket.id,
        nickname,
        playerType: "X",
        points: 0,
      };
      room.addPlayer(player);
      room.turn = player;
      socket.join(room.id);
      // io -> send data to everyone
      // socket -> sending data to yourself
      io.to(room.id).emit("createRoomSuccess", room);
      rooms.push(room);
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("joinRoom", async ({ nickname, roomId }) => {
    console.log("JoinRoom");

    try {
      const room = rooms.find((room) => room.id === roomId.toString());
      if (room.isJoin) {
        let player = {
          nickname,
          socketID: socket.id,
          playerType: "O",
          points: 0,
        };
        /*
        if(room.players[0].nickname === nickname){
          socket.emit(
            "errorOccurred",
            "Vous ne pouvez pas vous affronter vous même  !"
          );
        }else{
          */
          socket.join(roomId);
          room.addPlayer(player);
          room.isJoin = false;
          io.to(roomId).emit("joinRoomSuccess", room);
          io.to(roomId).emit("updatePlayers", room.players);
          io.to(roomId).emit("updateRoom", room);
        //}
      } else {
        socket.emit(
          "errorOccurred",
          "Cette partie est déjà en cours !"
        );
      }
    } catch (error) {
      if(error instanceof TypeError) {
        socket.emit(
          "errorOccurred",
          "Code de room introuvable !"
        );
      }else{
        console.log(error);
      }
    }
  });

  socket.on("tap", async ({ index, roomId }) => {
    console.log("tap");

    try {
      const room = rooms.find((room) => room.id === roomId);
      let choice = room.turn.playerType;
      if (room.turnIndex === 0) {
        room.turn = room.players[1];
        room.turnIndex = 1;
      } else {
        room.turn = room.players[0];
        room.turnIndex = 0;
      }
      io.to(roomId).emit("tapped", {
        index,
        choice,
        room,
      });
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("winner", async ({ winnerSocketId, roomId }) => {
    console.log("winner");

    try {
      const room = rooms.find((room) => room.id === roomId);
      let player = room.players.find((p) => p.socketID === winnerSocketId);
      player.points += 1;
      if (player.points >= 6) {
        console.log("endgame");
        io.to(roomId).emit("endGame", player);
      } else {
        io.to(roomId).emit("pointIncrease", player);
      }
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("nextRound", async ({ roomId }) => {
      try {
        const room = rooms.find((room) => room.id === roomId);
        room.currentRound = room.currentRound+1;
        io.to(roomId).emit("nextRound", room);

      } catch (e) {
        console.log(e);
      }
    });

});



server.listen(port, "0.0.0.0", () => {
  console.log(`Server started and running on port ${port}`);
});
