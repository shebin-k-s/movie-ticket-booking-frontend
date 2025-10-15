import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import TicketCard from "./components/TicketCard"
import { fetchMyTickets } from "../../features/tickets/ticketsThunk"

type Props = {}

const TicketScreen = ({ }: Props) => {

    const { tickets, loading } = useAppSelector(state => state.tickets);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchMyTickets());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex flex-1 items-center justify-center py-16">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400 text-lg">Loading tickets...</p>
                </div>
            </div>

        )
    }

    if (!tickets || tickets.length === 0) {
        return (
            <div className="flex justify-center items-center flex-1 text-white text-lg">
                No tickets found.
            </div>
        )
    }

    return (
        <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {tickets.map(ticket => (
                <TicketCard
                    key={ticket.bookingId}
                    ticket={ticket}
                />
            ))}
        </div>
    )
}

export default TicketScreen
