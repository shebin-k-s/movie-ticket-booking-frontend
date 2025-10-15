import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks"
import BaseLayout from "../layouts/BaseLayout";
import AuthPage from "../pages/Auth/AuthPage";
import Home from "../pages/Home/Home";
import ProtectedRoute from "./ProtectedRoute";
import MovieDetail from "../pages/Movie/MovieDetail";
import Booking from "../pages/booking/Booking";
import TicketScreen from "../pages/Ticket/TicketScreen";
import ScreenCreator from "../pages/Screen/ScreenCreator";
import { UserRole } from "../redux/commonTypes/commonTypes";
import TheaterAdminHome from "../pages/TheaterAdminHome";
import ScreenShowsPage from "../pages/ScreenShows/ScreenShows";
import SeatSelectionWrapper from "../pages/ScreenShows/components/SeatSelectionWrapper";
import CreateShow from "../pages/ScreenShows/CreateShow";
import CreateTheater from "../pages/CreateTheater";

type Props = {}

const AppRoutes = (_: Props) => {

    const user = useAppSelector(state => state.auth.user);

    return (
        <Routes>

            <Route element={<BaseLayout />}>



                <Route
                    path="/auth"
                    element={
                        user ?
                            <Navigate to="/" />
                            : <AuthPage />
                    }
                />
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/"
                        element={user?.role === UserRole.THEATER_ADMIN ? <TheaterAdminHome /> : <Home />}
                    />
                    <Route
                        path="/movie-detail"
                        element={<MovieDetail />}
                    />
                    <Route
                        path="/booking"
                        element={<Booking />}
                    />
                    <Route
                        path="/my-ticket"
                        element={<TicketScreen />}
                    />
                    <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>

                        <Route
                            path="/theater/create"
                            element={<CreateTheater />}
                        />
                    </Route>


                    <Route element={<ProtectedRoute allowedRoles={[UserRole.THEATER_ADMIN, UserRole.ADMIN]} />}>
                        <Route path="/screens/create" element={<ScreenCreator />} />
                        <Route path="/theater-admin" element={<TheaterAdminHome />} />
                        <Route path="/shows/seats" element={<SeatSelectionWrapper />} />
                        <Route path="/screens/shows" element={<ScreenShowsPage />} />
                        <Route path="/screens/shows/create" element={<CreateShow />} />
                    </Route>


                </Route>
            </Route>
        </Routes >
    )
}

export default AppRoutes