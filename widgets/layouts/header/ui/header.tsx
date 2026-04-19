import { cookies } from "next/headers";
import UserHeader from "./user-header";
import GuestHeader from "./guest-header";

const Header = async () => {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("auth-token");

  return isLoggedIn ? <UserHeader /> : <GuestHeader />;
};
export default Header;
