import io from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:9000";

class SocketService {
  socket = null;
  listenersAttached = false;

  connect(userId) {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        withCredentials: true,
        transports: ["websocket"],
      });

      this.socket.on("connect", () => {
        console.log("Socket connected:", this.socket.id);
        this.socket.emit("register", userId);
      });

      this.socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      this.socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });
    }
  }

  on(event, callback) {
    if (!this.socket) {
      console.warn("Socket not ready, retrying...");
      setTimeout(() => this.on(event, callback), 100);
      return;
    }

    this.socket.off(event);
    this.socket.on(event, callback);
  }
  off(event, callback) {
    if (!this.socket) return;
    this.socket.off(event, callback);
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new SocketService();
