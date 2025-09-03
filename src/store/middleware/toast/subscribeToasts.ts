import { isAnyOf } from "@reduxjs/toolkit";
import type { ListenerMiddlewareInstance } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { postProductSubscribe } from "@/store/thunks/productsThunk";

export const subscribeToasts = (middleware: ListenerMiddlewareInstance) => {
  middleware.startListening({
    matcher: isAnyOf(
      postProductSubscribe.fulfilled,
      postProductSubscribe.rejected
    ),
    effect: async (action) => {
      if (postProductSubscribe.fulfilled.match(action)) {
        const { message } = action.payload;
        toast.success(message);
      }

      if (postProductSubscribe.rejected.match(action)) {
        toast.error(action.payload || "Subscription failed");
      }
    },
  });
};
