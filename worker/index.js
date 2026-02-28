const keys = require("./keys");
const { createClient } = require("redis");

const redisClient = createClient({
  socket: {
    host: keys.redisHost,
    port: keys.redisPort,
    reconnectStrategy: () => 1000,
  },
});
redisClient.on("error", (err) => console.error("Redis Client Error", err));

const subscriber = redisClient.duplicate();
subscriber.on("error", (err) => console.error("Redis Subscriber Error", err));

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

async function start() {
  await redisClient.connect();
  await subscriber.connect();

  await subscriber.subscribe("insert", async (message) => {
    const result = fib(parseInt(message));
    await redisClient.hSet("values", message, result.toString());
  });

  console.log("Worker listening for messages...");
}

start().catch(console.error);
