const keys = require("./keys");
const express = require("express");
const cors = require("cors");
const { createClient } = require("redis");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.error(err));
});

const redisClient = createClient({
  socket: {
    host: keys.redisHost,
    port: keys.redisPort,
    reconnectStrategy: () => 1000,
  },
});
redisClient.on("error", (err) => console.error("Redis Client Error", err));

const redisPublisher = redisClient.duplicate();

async function startServer() {
  await redisClient.connect();
  await redisPublisher.connect();

  app.get("/", (req, res) => {
    res.send("Hi");
  });

  app.get("/values/all", async (req, res) => {
    const values = await pgClient.query("SELECT * from values");
    res.send(values.rows);
  });

  app.get("/values/current", async (req, res) => {
    const values = await redisClient.hGetAll("values");
    res.send(values);
  });

  app.post("/values", async (req, res) => {
    const index = req.body.index;

    if (parseInt(index) > 40) {
      return res.status(422).send("Index too high");
    }

    await redisClient.hSet("values", index, "Nothing yet!");
    await redisPublisher.publish("insert", index);
    pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

    res.send({ working: true });
  });

  app.listen(5000, () => {
    console.log("Listening on port 5000");
  });
}

startServer().catch(console.error);
