import { v4 as uuidv4 } from "uuid";

const GUEST_ID_KEY = "guestId";

export const getGuestId = (): string => {
  let id = localStorage.getItem(GUEST_ID_KEY);
  if (!id) {
    id = uuidv4();
    localStorage.setItem(GUEST_ID_KEY, id);
  }
  return id;
};