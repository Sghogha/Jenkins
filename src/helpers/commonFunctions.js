import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const setApiMessage = (type, message) => {
  // return () => {
  var commonProps = {
    position: "bottom-center",
    autoClose: 4000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    hideProgressBar: true,
    theme: "colored",
    style: {
      // background: "#438ac1",
      // color: "#ffffff",
      minHeight: "unset",
    },
    toastId: "active",
  };
  switch (type) {
    case "info":
      toast.info(message, commonProps);
      break;
    case "success":
      toast.success(message, commonProps);
      break;
    case "warning":
      toast.warning(message, commonProps);
      break;
    case "error":
      toast.error(message, commonProps);
      break;
    default:
      break;
  }
  // toast.clearWaitingQueue();
  // };
};
