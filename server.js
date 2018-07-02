// const express = require("express");

// const app = express();

// const port = 5000;

// app.get("/api/customers", (req, res) => {
//   const customers = [
//     { id: 1, firstName: "John", lastName: "Doe" },
//     { id: 2, firstName: "Stver", lastName: "Smith" },
//     { id: 3, firstName: "Mary", lastName: "Jane" }
//   ];
//   res.json(customers);
// });

// app.listen(port, () => console.log(`Server started on port ${port}`));

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 5000;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server); // < Interesting!

io.on("connection", client => {
  client.on("subscribeToTimer", interval => {
    console.log("client is subscribing to timer with interval ", interval);
    setInterval(() => {
      client.emit("timer", new Date());
    }, interval);
    client.emit("gameStarted", "welcome");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
