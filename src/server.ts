import "reflect-metadata";
import http from "http";
import {app} from "./app";
import { socketServer } from "./socket";
import debug0 from "debug";
import { normalizePort } from "./utils/normalizerPort";

const debug = debug0("server:server");
const port = normalizePort( process.env.PORT || "9000")
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

const io = socketServer(server);

// todo type error
function onError (error: any ) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}


app.get("/", function (req, res, next) {
    res.send("Hello Boy!!");
});

// io.on('connection', (socket) => {
//     console.log(socket)
// })

// todo херня для отладки ?
function onListening () {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
    debug("Listening on " + bind);


    console.log("Server Running on Port: ", port);
}