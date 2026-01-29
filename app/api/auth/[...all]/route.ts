import { auth } from "@/lib/auth"; // Import from the file we just created
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);