import { defineStore } from "pinia";

export const useSocketStore = defineStore({
    id: "socket",
    state: () => ({
        isConnected: false,
        message: "",
        socket: null as any,
    }),
    getters: {
        isOnline(): boolean {
            return this.isConnected;
        },
    },
    actions: {
        connect() {
            this.socket = new WebSocket("wss://unlockscan.site/")
            this.socket.onmessage = (event) => {
                this.message = JSON.parse(event.data);
            };
            this.socket.onopen = () => {
                this.isConnected = true;
            };
            this.socket.onclose = () => {
                this.isConnected = false;
                console.log("Disconnected");
                const reconnect = setTimeout(() => {
                    console.log("Reconnecting...");
                    this.connect();
                    clearTimeout(reconnect);
                }, 1000);
            };
        },
        disconnect() {
            this.isConnected = false;
            console.log("Disconnected");
        },
        sendMessage(message: any) {
            this.socket.send(JSON.stringify(message));
        },
    },
});