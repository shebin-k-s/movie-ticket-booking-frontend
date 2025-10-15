import { useEffect, useState } from "react";
import AuthForm from "./components/AuthForm";
import type { FormState } from "./components/types";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { loginUser, registerUser } from "../../features/auth/authThunk";
import { clearAuthError, clearAuthSuccess } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

type Props = {}

const AuthPage = (_: Props) => {

  const [isLogin, setIsLogin] = useState(true)

  const [error, setError] = useState("");

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useAppDispatch()

  const { user, success, successMessage, error: reduxError } = useAppSelector(state => state.auth)

  const navigate = useNavigate();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearAuthSuccess());

        if (user) {
          navigate("/dashboard", { replace: true });
        } else {
          setIsLogin(true);

        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, user, navigate, dispatch]);


  useEffect(() => {
    if (reduxError) {
      const timer = setTimeout(() => {
        dispatch(clearAuthError());
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [reduxError, dispatch]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("")

    if (!isLogin && form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (isLogin) {
      dispatch(loginUser({
        email: form.email,
        password: form.password
      }));
    } else {
      dispatch(registerUser({
        name: form.name,
        email: form.email,
        password: form.password
      }));
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          {isLogin ? "Login to your account" : "Create an account"}

        </h2>

        {(error || reduxError) && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error || reduxError}
          </p>
        )}
        {(successMessage) && (
          <p className="text-green-500 text-sm text-center mb-4">
            {successMessage}
          </p>
        )}


        <AuthForm
          isLogin={isLogin}
          onChange={handleChange}
          onSubmit={handleSubmit}
          form={form}
        />

        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "Don’t have an account? " : "Already Have An Account? "}
          <span
            onClick={() => setIsLogin((login) => !login)}
            className="text-green-500 font-medium cursor-pointer"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>

      </div>
    </div>
  )
}

export default AuthPage;
