import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { cancelBooking, initiatePayment } from '../../features/booking/bookingThunk';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { clearSelectedSeats } from '../../features/seats/seatsSlice';
import { clearBookingMessage, resetBooking } from '../../features/booking/bookingSlice';
import { showToast } from '../../utils/showToast';
import LoadingButton from './components/LoadingButton';

type Props = {};

declare global {
    interface Window {
        Razorpay: any;
        dispatchPaymentSuccess?: () => void;
    }
}

const Booking = ({ }: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { bookingId, seats, totalAmount, loading, error, successMessage, event, paymentOrder } = useAppSelector(
        (state) => state.bookings
    );

    const { user } = useAppSelector(state => state.auth);

    useEffect(() => {
        if (!bookingId) {
            navigate(-1);
        }
    }, [bookingId]);

    useEffect(() => {
        if (successMessage) {
            showToast(successMessage, "success");
            dispatch(clearSelectedSeats());
            dispatch(clearBookingMessage());
        }
        if (error) {
            showToast(error, "error");
            dispatch(clearBookingMessage());

            if (event === 'continue' && bookingId) {
                dispatch(cancelBooking(bookingId))
                    .unwrap()
                    .then(() => {
                        dispatch(resetBooking());
                    });
            }
        }
    }, [error, successMessage, dispatch, bookingId, event]);

    useEffect(() => {
        return () => {
            if (bookingId && !location.pathname.includes('booking')) {
                dispatch(cancelBooking(bookingId))
                    .unwrap()
                    .then(() => {
                        showToast("Booking cancelled as you left the page", "info");
                        dispatch(resetBooking());
                    });
            }
        };
    }, [bookingId, dispatch, location.pathname]);

    useEffect(() => {
        window.dispatchPaymentSuccess = () => {
            dispatch(resetBooking());
            showToast("Payment submitted. Waiting for confirmation...", "success");
        };

        return () => {
            delete window.dispatchPaymentSuccess;
        };
    }, [dispatch]);

    useEffect(() => {
        if (!paymentOrder) return;

        try {
            const { id: order_id, currency } = paymentOrder;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                currency: currency || "INR",
                name: "Movie Ticket Booking",
                description: "Booking Payment",
                order_id,
                handler: function () {
                    window.dispatchPaymentSuccess?.();
                },
                prefill: { name: user?.name, email: user?.email, contact: "" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
        }
    }, [paymentOrder, user]);

    const handleConfirmBooking = async () => {
        if (!bookingId || loading) return;
        dispatch(initiatePayment({ bookingId, amount: totalAmount }));
    };

    const handleCancelBooking = () => {
        if (!bookingId || loading) return;

        dispatch(cancelBooking(bookingId))
            .unwrap()
            .then(() => {
                setTimeout(() => {
                    dispatch(resetBooking());
                }, 2000);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-6">
            {bookingId && (
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                    <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Booking Summary</h2>

                    <p className="font-medium mb-2">Booking ID:</p>
                    <p className="text-gray-800 mb-4 text-center">{bookingId}</p>

                    <p className="font-medium mb-2">Seats:</p>
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                        {seats.map((seat) => (
                            <span
                                key={seat.seatId}
                                className="px-3 py-1 bg-gray-100 text-gray-800 font-semibold rounded-full shadow-sm"
                            >
                                {seat.row}{seat.number} ({seat.price ? `₹${seat.price}` : "-"})
                            </span>
                        ))}
                    </div>

                    <p className="text-center font-bold text-lg mb-6">Total: ₹{totalAmount}</p>

                    <div className="flex justify-between gap-4">
                        <LoadingButton
                            text="Cancel Booking"
                            loadingText="Processing..."
                            loading={loading && event === "cancel"}
                            onClick={handleCancelBooking}
                            disabled={!bookingId || loading}
                            color="red"
                        />
                        <LoadingButton
                            text="Continue Payment"
                            loadingText="Processing..."
                            loading={loading && event === "continue"}
                            onClick={handleConfirmBooking}
                            disabled={!bookingId || loading}
                            color="green"
                        />
                    </div>

                </div>
            )}
        </div>
    );
};

export default Booking;
