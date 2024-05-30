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
            this.socket = new WebSocket("https://anh-4.developer.vi-jp-te.info/")
            this.socket.onmessage = (event) => {
                this.message = JSON.parse(event.data);
            };
            this.socket.onopen = () => {
                this.isConnected = true;
            }
        },
        disconnect() {
            this.isConnected = false;
        },
        sendMessage(message: any) {
            this.socket.send(JSON.stringify(message));
        },
    },
});