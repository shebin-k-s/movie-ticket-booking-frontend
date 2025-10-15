import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchSeats } from "../../../features/seats/seatsThunk";
import { toggleSeat } from "../../../features/seats/seatsSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { initiateBooking } from "../../../features/booking/bookingThunk";
import { clearBookingMessage } from "../../../features/booking/bookingSlice";

type Props = {
    showId: string;
    seatSize?: number;
    seatGap?: number;
};

const SeatSelection = ({ showId, seatSize = 40, seatGap = 4 }: Props) => {


    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { loading: bookingLoading, error: bookingError } = useAppSelector(state => state.bookings);

    useEffect(() => {
        if (bookingError) {
            toast.error(bookingError);

            dispatch(clearBookingMessage())

        }

    }, [bookingError]);

    const { seatsData, selectedSeats, loading, showId: reduxShowId } = useAppSelector((state) => state.seats);

    useEffect(() => {
        if (!loading && showId !== reduxShowId) {

            dispatch(fetchSeats(showId));
        }
    }, [dispatch, showId, loading, reduxShowId]);

    if (loading)
        return (
            <div className="flex flex-1 items-center justify-center py-16 w-[calc(100vw-8rem)] max-w-3xl h-50 rounded-lg">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400 text-lg">Loading seats...</p>
                </div>
            </div>
        );

    if (!seatsData)
        return (
            <div className="flex justify-center px-5 items-center w-screen h-50 text-white">
                No seats available
            </div>
        );


    const sortedSeatTypes = Object.entries(seatsData || {}).sort(([, a], [, b]) => {
        const seatsA = a?.seats || [];
        const seatsB = b?.seats || [];

        if (seatsA.length === 0 || seatsB.length === 0) return 0;

        const minYA = Math.min(...seatsA.map((s) => s.positionY));
        const minYB = Math.min(...seatsB.map((s) => s.positionY));
        return minYB - minYA;
    });

    const maxBlockWidth = Math.max(
        ...sortedSeatTypes.map(([_, seatType]) => {
            const seats = seatType?.seats || [];
            if (seats.length === 0) return 0;
            const minX = Math.min(...seats.map((s) => s.positionX));
            const maxX = Math.max(...seats.map((s) => s.positionX));
            return (maxX - minX + 1) * (seatSize + seatGap);
        })
    );

    const initiateBookingHandler = () => {
        dispatch(
            initiateBooking({
                showId,
                seatIds: selectedSeats.map((s) => s.seatId),
            })
        )
            .unwrap()
            .then(() => {
                navigate("/booking");
            })
    };


    let cumulativeMinY = 0;

    return (
        <div className="w-full overflow-x-auto px-5">
            <div className="flex flex-col gap-8" style={{ minWidth: maxBlockWidth }}>
                {(sortedSeatTypes || []).map(([typeName, seatType]) => {
                    const seats = seatType?.seats || [];
                    if (seats.length === 0) return null;

                    const maxX = Math.max(...seats.map((s) => s.positionX));
                    const minY = Math.min(...seats.map((s) => s.positionY));
                    const maxY = Math.max(...seats.map((s) => s.positionY));


                    const startingY = Math.max(cumulativeMinY - maxY-1, 0);
                    cumulativeMinY = minY



                    const totalWidth = (maxX + 1) * (seatSize + seatGap);
                    const totalHeight = (maxY + startingY - minY + 1) * (seatSize + seatGap);

                    return (
                        <div key={typeName} className="flex flex-col items-center">
                            <h3 className="text-white font-bold mb-4">
                                {typeName} - ₹{seatType.price}
                            </h3>
                            <div
                                className="relative rounded-lg"
                                style={{
                                    width: totalWidth,
                                    height: totalHeight,
                                }}
                            >
                                {seats.map((seat) => {
                                    const isSelected = selectedSeats.some(
                                        (s) => s.seatId === seat.seatId
                                    );

                                    let seatClass = "flex items-center justify-center rounded-md text-xs font-semibold transition-all relative select-none ";

                                    if (seat.status === "BOOKED") {
                                        seatClass += "bg-red-600 text-white cursor-not-allowed opacity-60 shadow-inner";
                                    } else if (seat.isLocked) {
                                        seatClass += "bg-orange-500 text-white cursor-not-allowed opacity-60 shadow-inner";
                                    } else if (isSelected) {
                                        seatClass += "bg-green-600 text-white cursor-pointer shadow-md";
                                    } else {
                                        seatClass += "bg-gray-100 text-gray-800 hover:bg-green-200 cursor-pointer";
                                    }


                                    return (
                                        <div
                                            key={seat.seatId}
                                            className={seatClass}
                                            style={{
                                                position: "absolute",
                                                width: seatSize,
                                                height: seatSize,
                                                left: (maxX - seat.positionX) * (seatSize + seatGap),
                                                top: (maxY + startingY - seat.positionY) * (seatSize + seatGap),
                                            }}
                                            onClick={() =>
                                                seat.status === "AVAILABLE" && !seat.isLocked &&
                                                dispatch(toggleSeat(seat))
                                            }
                                        >
                                            {seat.row}
                                            {seat.number}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="w-full flex justify-center text-center mt-26 my-8 mb-20">
                <div className="max-w-lg w-full px-8 py-2 bg-gray-300 text-black font-semibold rounded-lg shadow-md">
                    SCREEN
                </div>
            </div>

            <div className="flex justify-center gap-6 mt-4 mb-12 text-white font-semibold">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-700 rounded" />
                    <span>Booked</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-500 rounded" />
                    <span>Locked</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-600 rounded" />
                    <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-100 border border-gray-300 rounded" />
                    <span>Available</span>
                </div>
            </div>

            {selectedSeats.length > 0 && (
                <div className="bottom-4 mb-9 left-0 w-full flex flex-col items-center z-50 gap-2">
                    <button
                        disabled={bookingLoading}
                        className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg cursor-pointer shadow-lg hover:bg-green-700 transition disabled:opacity-50"
                        onClick={initiateBookingHandler}
                    >
                        {bookingLoading ? "Processing..." : `Buy Ticket (${selectedSeats.length})`}
                    </button>

                </div>
            )}



        </div >
    );
};

export default SeatSelection;
