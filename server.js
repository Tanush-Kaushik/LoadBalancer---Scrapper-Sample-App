const express = require('express');
const axios = require('axios');
const Redis = require('redis');
const { promisify } = require('util');
const cors = require('cors');
const { config } = require('dotenv');
const compression = require('compression');
const { router } = require('./routes/dataConsole');

const app = express();
const port = process.env.PORT || 3000;
config({ path: '/.env' });
app.use(cors());
app.use(compression());
app.use(router)

const redisClient = Redis.createClient();
(async () => {
  await redisClient.connect();
  console.log('Connected to Redis');
})();

app.get('/temp/:id', async (req, res) => {
  const { id } = req.params;

  const obj = await redisClient.get(id);

  if (obj) {
    return res.send(JSON.parse(obj));
  } else {
    // @ts-ignore
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );
    await redisClient.set(id,JSON.stringify(data));
    return res.send(data);
  }
});

// app.get("*", (req,res,next) => {
//   console.log("Temporary")
//   next()
// })

app.get('/test', (req, res) => { 
  res.send(req.get('host')+req.originalUrl);
}); 
 
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// const app2 = express();

// app2.get('/test', (req, res) => {
//   res.send('This is app2');
// });

// app2.listen(3001, () => {
//   console.log('Listening at 3001');
// });
