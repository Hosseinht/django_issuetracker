import AuthClient from "@/app/services/authClient";
import { CheckUser } from "@/app/entities/User";

export default new AuthClient<CheckUser>("/check/");
