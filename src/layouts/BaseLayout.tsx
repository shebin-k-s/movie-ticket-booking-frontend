import { Outlet } from "react-router-dom"
import Header from "../components/layout/Header"
import { ToastContainer } from "react-toastify"
import { useAppSelector } from "../hooks/reduxHooks"
import { useEffect } from "react"
import { joinShowRoom, leaveShowRoom } from "../socket/socket"

type Props = {}

const BaseLayout = (_: Props) => {

    const { showId } = useAppSelector(state => state.seats)

    useEffect(() => {
        if (!showId) return;

        joinShowRoom(showId);

        return () => {
            leaveShowRoom(showId);
        };
    }, [showId]);
    
    return (
        <div className="relative min-h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden flex flex-col">
            {/* <div className="absolute -top-22 -right-18 w-[300px] h-[300px] rounded-full bg-[#1DE782] opacity-100 blur-[220px]" />
            <div className="absolute -bottom-22 -left-22 w-[300px] h-[300px] rounded-full bg-[#1DE782] opacity-100 blur-[220px]" /> */}

            <ToastContainer
                position="top-center"
                autoClose={3000}
                pauseOnFocusLoss={false}
                newestOnTop
                pauseOnHover={false}
                limit={1}
            />

            <Header />
            <div className="relative w-full p-4 flex-1 flex flex-col">
                <Outlet />
            </div>
        </div>
    )
}

export default BaseLayout