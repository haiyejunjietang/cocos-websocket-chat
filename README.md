# Cocos WebSocket 聊天室  
一个用 Cocos Creator 实现的简单聊天室，支持「输入用户名→发送消息→多用户广播」全流程。  

## 功能说明  
- 输入用户名和消息内容，点击发送按钮发送消息  
- 后端接收后广播给所有连接的用户，实现实时同步  

## 技术栈  
- 前端：Cocos Creator（用了 EditBox、Label、Button 组件）  
- 通信：原生 WebSocket  
- 后端：Node.js（简单的广播服务器）  

## 核心流程  
1. **连接**：Cocos 初始化 WebSocket 连接后端服务器  
2. **发送**：点击发送时，将「用户名+消息」通过 WebSocket 发给后端  
3. **广播**：后端收到后，转发给所有连接的客户端，前端更新消息列表  

### 核心代码位置
- 前端WebSocket逻辑：[`scripts/`](https://github.com/haiyejunjietang/cocos-websocket-chat/blob/main/scripts/ChatManager.ts)（包含连接、发送、广播的核心实现）  
- 服务端广播逻辑：[`server-node/`](https://github.com/haiyejunjietang/cocos-websocket-chat/blob/main/server-node/server.js)（Node.js实现的WebSocket服务）  
