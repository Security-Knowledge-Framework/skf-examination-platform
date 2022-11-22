import { user } from "../../stores/user";
import { isObjEmpty } from "../../utils/utils";

export const isUserLoggedIn = () => !isObjEmpty(user);
