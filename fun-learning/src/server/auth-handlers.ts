// Thin re-export so the route file is a pure boundary.
import { handlers } from "@/server/auth";
export const { GET, POST } = handlers;
