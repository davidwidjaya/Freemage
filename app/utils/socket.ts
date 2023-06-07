import Config from '@config';
import { io } from 'socket.io-client';
import global from '@utils/global';

const socket = io(Config.SOCKETIO_URL, {
    path: Config.SOCKETIO_PATH,
    transports: ["websocket", "polling"],
    autoConnect: false,
    forceNew: true,
    auth: { token: global.socket_token }
});

socket.on("connect", () => {
    console.log(`socket connected`); // true
});

socket.on("connect_error", (err) => {
    // console.log('failed to connect ws server');
    console.log(`failed to connect socket server due to ${err.message}`);
    // socket.io.opts.transports = ["polling", "websocket"];
});

export const initSocket = (token = null) => {
    socket.auth = { token: token || global.socket_token };
    console.log('connecting socket');
    socket.connect();
}

export const disconnectSocket = () => {
    socket.disconnect()
}

export default socket;
