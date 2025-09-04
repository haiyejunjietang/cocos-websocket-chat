const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// 存储所有连接的客户端
const clients = new Set();
let onlineCount = 0;
console.log('服务器启动,监听端口8080...');

wss.on('connection', (ws) => {
    console.log('新客户端连接');
    clients.add(ws);
    onlineCount++;
    broadcastOnlineCount();
    // 接收客户端消息
    ws.on('message', (data) => {
        const message = data.toString();
        console.log('收到消息:', message);

        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // 客户端断开连接
    ws.on('close', () => {
        console.log('客户端断开连接');
        clients.delete(ws);
        onlineCount--; 
        if (onlineCount < 0) onlineCount = 0; 
        broadcastOnlineCount(); 
    });
    function broadcastOnlineCount() {
        const message =  `[onlineCount]${onlineCount}`;
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
        console.log("当前在线人数：", onlineCount);
    }

});
