import {Server} from "socket.io";
import {useSocketServer} from "socket-controllers";
import {Server as HTTPSServer} from "https";
import {Http2SecureServer} from "http2";
import * as http from "http";
import {corsOptions} from "./cors";

// todo check type httpServer
export const socketServer = (httpServer: http.Server | HTTPSServer | Http2SecureServer | number) => {
    const io = new Server(httpServer, {
        cors: corsOptions

    })

    useSocketServer(io, {controllers: [__dirname + "/api/controllers/*.ts"]})

    return io
}