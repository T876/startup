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

    let connections = []

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

            ws.send(JSON.stringify(pictures))
        });

        ws.send('Connection Active');
    });
}

module.exports = { webSocketInit }