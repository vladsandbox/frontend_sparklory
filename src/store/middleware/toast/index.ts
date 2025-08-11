import { createListenerMiddleware } from "@reduxjs/toolkit";
import { cartToasts } from "./cartToasts";

export const toastMiddleware = createListenerMiddleware();

cartToasts(toastMiddleware);