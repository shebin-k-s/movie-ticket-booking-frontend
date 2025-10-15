import { toast } from "react-toastify";

export const showToast = (message: string, type: "info" | "error" | "success") => {
    toast.dismiss(); 
    toast[type](message);
};
