import { Link, useLocation } from "react-router-dom"
import logo from '../../assets/appLogo.png'
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import CustomButton from "../ui/CustomButton"
import { logout } from "../../features/auth/authSlice"
import { UserRole } from "../../redux/commonTypes/commonTypes"

type Props = {}

const Header = (_: Props) => {

    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch()

    const location = useLocation();

    const hideButtons = location.pathname === "/auth";

    console.log("i am called");
    

    return (
        <div className="w-full flex justify-between items-center h-20 px-8 relative z-20">
            <Link to="/">
                <img className="w-30 h-11 object-contain" src={logo} alt="Logo" />
            </Link>


            {!hideButtons && (<div className="flex gap-4">
                {user ? (
                    <>
                        {user.role === UserRole.ADMIN && (
                            <div className="flex">
                                <CustomButton
                                    text="Add Movie"
                                    to="/movies/create"
                                />
                                <CustomButton
                                    text="Add Theater"
                                    to="/theater/create"
                                />
                            </div>
                        )}

                        <CustomButton
                            text="My Ticket"
                            to="/my-ticket"
                        />
                        <CustomButton
                            text="Logout"
                            onClick={() => dispatch(logout())}
                            bgColor="bg-red-600"
                        />
                    </>
                ) : (
                    <>
                        <CustomButton text="Login" to="/register" bgColor="bg-green-500" />
                        <CustomButton text="Register" to="/login" outlined />
                    </>
                )}
            </div>
            )}
        </div>

    )
}

export default Header