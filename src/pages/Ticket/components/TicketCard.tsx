import CustomButton from "../../../components/ui/CustomButton";
import type { Ticket } from "../../../features/tickets/ticketsType";

type Props = {
  ticket: Ticket;
};

const TicketCard = ({ ticket }: Props) => {
  const showTime = new Date(ticket.show.startTime);
  const currentTime = new Date();
  const isExpired = currentTime > showTime;

  const formattedDate = showTime.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = showTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="relative w-[300px] border border-gray-700 rounded-3xl shadow-2xl overflow-hidden hover:scale-[1.03] transition-transform duration-300">

      {isExpired && (
        <div className="absolute top-3 right-[-30px] transform rotate-45 bg-red-600 text-white font-bold px-6 py-1 shadow-lg text-sm z-20">
          EXPIRED
        </div>
      )}

      <div className="p-6 flex flex-col gap-5 relative z-10">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-white">{ticket.show.movie?.title}</h2>
          <div className="flex justify-between text-gray-400 text-sm">
            <span>{formattedDate}</span>
            <span>{formattedTime}</span>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 flex flex-col gap-3">
          <div className="flex flex-col text-gray-300 text-sm gap-1">
            <span><strong>Theater:</strong> {ticket.show.screen?.theater?.name || "-"}</span>
            <span><strong>Hall:</strong> {ticket.show.screen?.name || "-"}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-400 text-sm">Seats ({ticket.seats.length})</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {ticket.seats.map((seat, idx) => (
                <span
                  key={idx}
                  className="border border-gray-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm"
                >
                  {seat.row}{seat.number}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-3">
            <span className="text-white font-bold text-lg">Total: ₹{ticket.totalAmount}</span>
          </div>
        </div>

        <CustomButton
          text={isExpired ? "View Details" : "Download Ticket"}
          bgColor={isExpired ? "bg-gray-600" : "bg-green-600"}
          fullWidth
          outlined={isExpired}
        />
      </div>

    </div>
  );
};

export default TicketCard;
