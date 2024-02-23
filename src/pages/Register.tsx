import {storeInSession} from "@/common/session";
import {updateCurrentuser} from "@/redux/slices/UserSlice";
import {RootState} from "@/redux/store";
import axios from "axios";
import {useState} from "react";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";

const Register = () => {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const error = useSelector((state: RootState) => state.userSlice.error);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const registerUser = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    if (username != username.toLowerCase()) {
      toast.error("Username should be in lowercase!");
    }

    let userForm = {username, email, password};

    setLoading(true);

    axios
      .post("https://hcj-compiler-backend.vercel.app/user/register", userForm)
      .then((response) => {
        if (response.data.success) {
          dispatch(updateCurrentuser(response.data.user));
          storeInSession("token", response.data.token);
          setLoading(false);
          form.reset();
          navigate("/");
          toast.success(response.data.message);
        } else {
          setLoading(false);

          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  return !error && user._id ? (
    <Navigate to="/" />
  ) : (
    <div className=" h-[calc(100dvh-60px)] grid-bg w-full flex items-center justify-center  ">
      <main className="border-[0.01px] border-slate-400/30 px-5 py-5   w-[90%] md:w-[40%] lg:w-[25%] bg-black ">
        <p className=" text-[2rem] font-bold text-white tracking-wider ">Register</p>
        <p className=" text-white text-[0.8rem] tracking-wider italic ">Join the community of expert frontend developers🧑‍💻.</p>

        <form action="" className=" mt-5 " onSubmit={registerUser}>
          <input type="text" name="username" placeholder="username" className=" bg-black text-white tracking-wider text-[0.8rem] px-2 py-2 border-[0.01px] border-slate-400/30 w-full outline-none " />
          <input type="email" name="email" placeholder="email" className=" mt-2 bg-black text-white tracking-wider text-[0.8rem] px-2 py-2 border-[0.01px] border-slate-400/30 w-full outline-none " />
          <input type="password" name="password" placeholder="password" className=" mt-2 bg-black text-white tracking-wider text-[0.8rem] px-2 py-2 border-[0.01px] border-slate-400/30 w-full outline-none " />

          <button type="submit" className=" bg-white text-black text-[0.9rem]  w-full text-center mt-2  font-semibold tracking-wider py-2  rounded-md">
            {loading ? "loading..." : "Register"}
          </button>
        </form>

        <p className=" text-white text-[0.8rem] tracking-wider italic mt-4 ">
          Already have a account? <span className=" cursor-pointer text-blue-500 ">Login</span>.
        </p>
      </main>
    </div>
  );
};

export default Register;
