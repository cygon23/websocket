import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

const server = http.createServer(function (request: any, response: any) {
    console.log(new Date() + ' Received request for ' + request.url);
    response.end('Hello World\n');
});

const wss = new WebSocketServer({ server });

wss.on('connection', function (ws: WebSocket) {
    ws.on('error', console.error);
    console.log('New client connected');

    ws.on('message', function (data, isBinary) {
        console.log('Received:', data.toString());

        // Broadcast to other clients
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });

        // Echo back to sender
        ws.send('Echo: ' + data.toString());
    });

    ws.on('close', function () {
        console.log('Client disconnected');
    });
});

const PORT = 8080;
server.listen(PORT, function () {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
