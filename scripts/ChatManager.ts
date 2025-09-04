
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.EditBox)
    msgInput: cc.EditBox = null;
    @property(cc.ScrollView)
    msgscroll: cc.ScrollView = null;
    @property(cc.Prefab)
    msgPre: cc.Prefab = null;
    @property(cc.Prefab)
    inputnamePre: cc.Prefab = null;
    @property(cc.Label)
    onlineCount: cc.Label = null;

    private userName: string = "";
    private ws: WebSocket = null;
    start() {
        this.connectServer();
        this.showInputName();

    }
    connectServer() {
        this.ws = new WebSocket("ws://localhost:8080");
        this.ws.addEventListener("open", () => {
            cc.log("连接成功");
        });
        this.ws.addEventListener("message", (event) => {
            cc.log("收到消息：" + event.data)
            this.handleMessage(event.data);
        });
        this.ws.addEventListener("close", () => {
            cc.log("连接断开")
        });
        this.ws.addEventListener("error", (event) => {
            cc.log("连接错误");
        });
    }
    sendMessage() {
        const msg = this.msgInput.string;
        if (msg === "")
            return;
        const msgNode = this.userName + ":" + msg;
        this.ws.send(msgNode);
        this.msgInput.string = "";

    }
    handleMessage(msg) {
        if (msg.startsWith('[onlineCount]')) {
            const count =msg.replace('[onlineCount]', '');
            this.onlineCount.string = "在线人数：" + count;
            return;
        }
        const msgNode = cc.instantiate(this.msgPre);
        this.msgscroll.content.addChild(msgNode);
        const msgLabel = msgNode.getChildByName("msgLabel").getComponent(cc.Label);
        msgLabel.string = msg;
        this.scheduleOnce(() => {
            this.msgscroll.scrollToBottom(0.1);
        }, 0);
    }
    showInputName() {
        const inputnamePre = cc.instantiate(this.inputnamePre);
        cc.find("Canvas").addChild(inputnamePre);
        const enterBtn = inputnamePre.getChildByName("input").getChildByName("Button").getComponent(cc.Button);
        enterBtn.node.on("click", () => {
            const name = inputnamePre.getChildByName("input").getChildByName("EditBox").getComponent(cc.EditBox).string;
            cc.log("输入的名字：" + name)
            this.userName = name;
            inputnamePre.destroy();
        })
    }
}
