import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {RootState} from "@/redux/store";
import {LogOut} from "lucide-react";
import {removeFromSession} from "./session";
import {logoutUser} from "../redux/slices/UserSlice";
import toast from "react-hot-toast";

const Header = () => {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const dispatch = useDispatch();

  const logout_User = () => {
    removeFromSession("token");
    dispatch(logoutUser());
    toast.success("Logout Sucessfully!");
  };
  return (
    <div className=" w-full h-[60px] bg-gray-900 flex justify-between items-center px-2 md:px-5 ">
      <Link to="/">
        <h1 className=" text-white text-[1rem] md:text-[1.2rem] font-bold  tracking-wider ">HCJ Compiler</h1>
      </Link>

      <section className=" flex items-center justify-center gap-3 ">
        <Link to="/compiler">
          <button className=" bg-slate-800  py-2 px-3 md:px-5 text-white tracking-wider font-semibold rounded-md text-[0.8rem] ">Compiler</button>
        </Link>

        {!user?._id ? (
          <>
            <Link to="/login">
              <button className=" bg-blue-700  py-2 px-3 md:px-5 text-white tracking-wider font-semibold rounded-md text-[0.8rem] ">Login</button>
            </Link>
            <Link to="/register">
              <button className=" bg-blue-700  py-2 px-3 md:px-5 text-white tracking-wider font-semibold rounded-md text-[0.8rem] ">Register</button>
            </Link>
          </>
        ) : (
          <div className=" rounded-md flex items-center justify-center gap-5 px-5 py-2 bg-blue-700 text-white   font-semibold text-[0.8rem] tracking-wider">
            <p>{user.username}</p>
            <LogOut size={16} className=" cursor-pointer" onClick={logout_User} />
          </div>
        )}
      </section>
    </div>
  );
};

export default Header;
