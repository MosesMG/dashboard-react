import authRoutes from "./authRoutes";
import guestRoutes from "./guestRoutes";

export const routes = [...guestRoutes, ...authRoutes];
