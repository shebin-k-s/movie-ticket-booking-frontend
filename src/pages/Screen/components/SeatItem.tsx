import React from "react";
import type { Row, Seat } from "./types";

type Props = {
  seat: Seat;
  rowLetter: string;
  row: Row;
  onClick: () => void;
};

const SeatItem: React.FC<Props> = ({ seat, rowLetter, row, onClick }) => {
  const getSeatLabel = () => {
    if (!seat.selected) return seat.number.toString();
    const seatIndex = row.seats.filter((s) => s.selected).findIndex((s) => s === seat) + 1;
    return `${rowLetter}${seatIndex}`;
  };

  return (
    <div
      title={seat.selected ? `Seat: ${getSeatLabel()}` : `Seat number: ${seat.number}`}
      onClick={onClick}
      className={`w-8 h-8 rounded cursor-pointer flex items-center justify-center select-none transition hover:ring-2 hover:ring-blue-500 ${
        seat.selected ? "bg-green-500" : "bg-gray-700"
      }`}
    >
      {getSeatLabel()}
    </div>
  );
};

export default SeatItem;
