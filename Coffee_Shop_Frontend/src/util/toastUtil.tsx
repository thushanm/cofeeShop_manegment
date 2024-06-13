import {toast, Slide} from "react-toastify";
import CustomToast from "../components/component/toast/custom.toast.tsx";

export const error = (title: string, message: string) => {

    return toast(<CustomToast title={title} message={message}/>, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 3000,
        // isLoading:true,
    });

}

