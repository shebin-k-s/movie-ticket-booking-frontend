import { io } from "socket.io-client";
import { useAppDispatch } from "../hooks/reduxHooks";
import type { seatUpdatePayload } from "../features/seats/seatsTypes";
import { updateSeatStatus } from "../features/seats/seatsSlice";


export const socket = io('https://movie-ticket-booking-backend-4bre.onrender.com', {
    transports: ['websocket'],
    autoConnect: true,
    withCredentials: true
})


export const joinShowRoom = (showId: string) => {
    if (!socket.connected) {
        socket.connect();
    }
    console.log("joined");
    
    socket.emit('joinShowRoom', showId)
}

export const leaveShowRoom = (showId: string) => {
    if (!socket.connected) {
        socket.connect();
    }
    console.log("leaved");

    socket.emit('leaveShowRoom', showId)
};


export const SocketProvider = () => {

    const dispatch = useAppDispatch()

    if (!socket.connected) {
        socket.connect();
    }



    socket.on('seatUpdate', (payload: seatUpdatePayload) => {
        console.log(payload);

        dispatch(updateSeatStatus(payload))

    })

    return null;
}
