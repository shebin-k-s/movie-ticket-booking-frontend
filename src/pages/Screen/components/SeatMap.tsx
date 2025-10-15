import SeatItem from "./SeatItem";
import type { Block } from "./types";

type Props = {
  block: Block;
  bIdx: number;
  toggleSeatSelection: (blockIndex: number, rowLabel: string, seatNumber: number) => void;
  toggleRowSelection?: (blockIndex: number, rowLabel: string) => void;
  toggleColumnSelection?: (blockIndex: number, colNumber: number) => void; // new column toggle
  startingRowLetterIndex: number;
};

const SeatMap: React.FC<Props> = ({
  block,
  bIdx,
  toggleSeatSelection,
  toggleRowSelection,
  toggleColumnSelection,
  startingRowLetterIndex,
}) => {
  let localRowLetterIndex = startingRowLetterIndex;
  const numCols = block.layout[0]?.seats.length || 0;

  return (
    <div className="mb-8 bg-gray-800 p-4 rounded text-white">
      <h3 className="font-bold mb-2">
        {block.blockName || `Block ${bIdx + 1}`} (Price Adj: {block.priceAdjustment})
      </h3>

      {/* Scrollable container */}
      <div className="flex items-center justify-center">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-max">
            {toggleColumnSelection && (
              <div className="flex gap-1 mb-2">
                <div className="w-6 mr-2" />
                {Array.from({ length: numCols }, (_, i) => (
                  <div
                    key={i}
                    className="w-8 text-center cursor-pointer font-semibold select-none"
                    onClick={() => toggleColumnSelection(bIdx, i + 1)}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            )}
            {block.layout.map((row) => {
              const hasSelectedSeats = row.seats.some(seat => seat.selected);
              const rowLetter = hasSelectedSeats
                ? String.fromCharCode(65 + localRowLetterIndex++)
                : "";
              return (
                <div key={row.row} className="flex items-center mb-1 justify-center">
                  <div
                    className="w-6 mr-2 cursor-pointer font-semibold select-none"
                    onClick={() => toggleRowSelection && toggleRowSelection(bIdx, row.row)}
                  >
                    {rowLetter}
                  </div>
                  <div className="flex gap-1 flex-nowrap">
                    {row.seats.map((seat) => (
                      <SeatItem
                        key={seat.x}
                        seat={seat}
                        rowLetter={rowLetter}
                        row={row}
                        onClick={() => toggleSeatSelection(bIdx, row.row, seat.number)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
