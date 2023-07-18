const express = require("express");
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");
const http = require('http');

const PORT = process.env.PORT || 8080;

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Configurations for "Static-files"

app.use(express.static(`${__dirname}/public`));

// app.use(
//   cookieSession({
//     name: "bezkoder-session",
//     secret: "COOKIE_SECRET", // should use as secret environment variable
//     httpOnly: true
//   })
// );

const db = require("./app/models");
const Role = db.role;
const Result = db.result;

db.mongoose
  // .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  .connect(`mongodb://localhost:27017/limbo`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

function initial() {
    Role.countDocuments()
        .then(count => {
            if (count === 0) {
                new Role({
                    name: "personal"
                }).save()
                    .then(() => console.log("added 'personal' to roles collection"))
                    .catch(err => console.error("error", err));
                    
                new Role({
                    name: "business"
                }).save()
                    .then(() => console.log("added 'business' to roles collection"))
                    .catch(err => console.error("error", err));
                
                new Role({
                    name: "moderator"
                }).save()
                    .then(() => console.log("added 'moderator' to roles collection"))
                    .catch(err => console.error("error", err));
                
                new Role({
                    name: "admin"
                }).save()
                .then(() => console.log("added 'admin' to roles collection"))
                .catch(err => console.error("error", err));
            }
        })
        .catch(err => console.error("error", err));
}

const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws) {
    console.log('A client connected');
  
    ws.on('message', function incoming(message) {

        const result = new Result({
            bet_result: message.toString(),
            created_at: Date.now(),
        });

        result.save()
            .then((doc) => {
                console.log('Document saved:', doc);
            })
            .catch((err) => {
                console.error('Error saving document:', err);
            });

      console.log('Received message:', message.toString());
      ws.send('Hello from server!');
    });
  
    ws.on('close', function close() {
      console.log('A client disconnected');
    });
    
});

//start our server
server.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});