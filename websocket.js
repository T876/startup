const { WebSocketServer } = require( 'ws' )
const uuid = require('uuid');

function webSocketInit(httpServer) {
    const wss = new WebSocketServer({ noServer: true })

    httpServer.on('upgrade', (req, socket, head) => {
        wss.handleUpgrade(req, socket, head, function done(ws){
            ws.emit('connection', ws, req);
            console.log('WS iniitiated')
        });
    });

    let connections = []

    wss.on('connection', (ws) => {
        const connection = { id: uuid.v4(), alive: true, ws: ws  };
        connections.push(connection);
        console.log(connections);

        ws.on('message', function like(data) {
            const msg = String.fromCharCode(...data);
            console.log("received: %s", msg)

            ws.send(`I heard you say: ${msg}`)
        });

        ws.send('Connection Active');
    });
}

module.exports = { webSocketInit }