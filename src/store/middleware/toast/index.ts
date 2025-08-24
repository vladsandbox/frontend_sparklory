import { createListenerMiddleware } from "@reduxjs/toolkit";
import { cartToasts } from "./cartToasts";
import { paymentToasts } from "./paymentToast";

export const toastMiddleware = createListenerMiddleware();

cartToasts(toastMiddleware);
paymentToasts(toastMiddleware);