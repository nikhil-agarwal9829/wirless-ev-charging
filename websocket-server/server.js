const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json()); // To parse JSON body from MATLAB

// Handle HTTP POST requests from MATLAB Online
app.post("/send-data", (req, res) => {
    const data = req.body;
    console.log("Received data from MATLAB:", data);

    // Broadcast the data to all connected WebSocket clients (website)
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });

    res.status(200).send("Data sent to WebSocket clients");
});

// Handle WebSocket connections from the website
wss.on("connection", ws => {
    console.log("New WebSocket client connected");

    ws.on("message", message => {
        console.log("Received from client:", message);
    });

    ws.on("close", () => {
        console.log("WebSocket client disconnected");
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`HTTP server listening on port ${PORT}`);
});
