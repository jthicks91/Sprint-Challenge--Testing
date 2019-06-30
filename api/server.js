const express = require("express");
const server = express();

function logger(req, res, next) {
  const { path } = req;
  const timeStamp = Date.now();
  const log = { path, timeStamp };
  console.log(`${req.method} Request`, log);
  next();
}

server.use(logger);
server.use(express.json());

let games = [
  {
    id: 1,
    title: "NBA 2K19",
    genre: "Sports",
    releaseYear: 2018
  },
  {
    id: 2,
    title: "Mortal Kombat",
    genre: "Fighting",
    releaseYear: 1990
  },
  {
    id: 3,
    title: "Call of Duty: Modern Warfare",
    genre: "Shooting",
    releaseYear: 2007
  }
];

server.get("/", (req, res) => {
  res.status(200).json({ api: "Sever is ready for take-off." });
});

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

server.post("/games", (req, res) => {
  const { id, title, genre, releaseYear } = req.body;
  if ((!id, (!title && !genre && !releaseYear) || id === games.id)) {
    res.status(422).json({ err: "Needs all info" });
  } else {
    const createdGame = { id, title, genre, releaseYear };
    games = [...games, createdGame];
    res.status(201).json({ message: `${createdGame}` });
  }
});
module.exports = server;
