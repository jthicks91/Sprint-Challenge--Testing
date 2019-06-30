const server = require("./api/server");
const request = require("supertest");

describe("Testing the API", () => {
  describe("get games", () => {
    it("gets a list of games even if the array is empty", async () => {
      const response = await request(server).get("/games");
      expect(Array.isArray(response.body)).toBeTruthy();
    });
    it("should send a status code of 200", async () => {
      // send request to server to get games
      const response = await request(server).get("/games");
      // on response, expecting 200
      expect(response.status).toBe(200);
    });
    it("should return the total games in the database", async () => {
      // send request to server to get games
      const response = await request(server).get("/games");
      //on response, expecting length to be 3
      expect(response.body.length).toBe(3);
    });
  });
});

describe("post", () => {
  it("should return 422 if data is invalidly sent", async () => {
    const game = { game: "supermario" };
    const response = await request(server)
      .post("/games")
      .send(game);
    expect(response.status).toBe(422);
  });
  it("should 422 if improper data is provided", async () => {
    const game = { title: "Mortal Kombat" };
    const response = await request(server)
      .post("/games")
      .send(game);
    expect(response.status).toBe(422);
  });
  it("should return 201 if game is correctly added", async () => {
    const game = {
      id: "4",
      title: "Apex Legends",
      genre: "Shooting",
      releaseYear: 2019
    };
    const response = await request(server)
      .post("/games")
      .send(game);
    expect(response.status).toBe(201);
  });
});
