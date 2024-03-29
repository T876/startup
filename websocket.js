const { WebSocketServer } = require( 'ws' )
const uuid = require('uuid');

let pictures = {}

function webSocketInit(httpServer) {
    const wss = new WebSocketServer({ noServer: true })

    httpServer.on('upgrade', (req, socket, head) => {
        wss.handleUpgrade(req, socket, head, function done(ws){
            wss.emit('connection', ws, req);
            console.log('WS initiated')
        });
    });

    let connections = [];

    wss.on('connection', (ws) => {
        const connection = { id: uuid.v4(), alive: true, ws: ws  };
        connections.push(connection);
        console.log(connections);

        ws.on('message', function like(data) {
            const msg = String.fromCharCode(...data);
            
            // Save the like
            if (!pictures[msg]) {
                pictures[msg] = 1;
            } else {
                pictures[msg]++;
            };

            console.log(pictures)

            connections.forEach((c) => {
                c.ws.send(JSON.stringify(pictures));
            });
        });

        ws.on('close', () => {
            connections.findIndex((obj, idx) => {
                if (obj.id === connection.id) {
                    connections.splice(idx, 1);
                    return true;
                }
            });
        });

        ws.send(JSON.stringify(pictures));
    });
}

module.exports = { webSocketInit }