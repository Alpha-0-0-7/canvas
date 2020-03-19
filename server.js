const express = require("express");
const app = express();

const http = require("http");
const server = http.Server(app);

const socketServer = require("socket.io");
var io = socketServer(server);

app.use(express.static('public'));

io.on("connection", function (socket) {
    console.log(socket.id);
    socket.on("drawdown", function (pt) {
        socket.broadcast.emit("drawdown", pt);
    });
    socket.on("drawmove", function (pt) {
        socket.broadcast.emit("drawmove", pt);
    });
    socket.on("drawup", function () {
        socket.broadcast.emit("drawup");
    });
    socket.on("undo", function (obj) {
        socket.broadcast.emit("undo", obj);
    });
    socket.on("redo", function (obj) {
        socket.broadcast.emit("redo", obj);
    });
    socket.on("imageLoad", function (img) {
        socket.broadcast.emit("imageLoad", img);
    });
    socket.on("imagemove", function (obj) {
        socket.broadcast.emit("imagemove", obj);
    });
    socket.on("stickyCreate", function () {
        socket.broadcast.emit("stickyCreate");
    });
    socket.on("stickyMove", function (obj) {
        socket.broadcast.emit("stickyMove", obj);
    });
    socket.on("stickyClose", function (index) {
        socket.broadcast.emit("stickyClose", index);
    });
    socket.on("contentChange", function (obj) {
        socket.broadcast.emit("contentChange", obj);
    });
});
// for our local host at 3000
const port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log("Server is listening at port 3000");
});