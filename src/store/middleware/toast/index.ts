import { createListenerMiddleware } from "@reduxjs/toolkit";
import { cartToasts } from "./cartToasts";
import { paymentToasts } from "./paymentToast";
import { subscribeToasts } from "./subscribeToasts";

export const toastMiddleware = createListenerMiddleware();

cartToasts(toastMiddleware);
paymentToasts(toastMiddleware);
subscribeToasts(toastMiddleware);