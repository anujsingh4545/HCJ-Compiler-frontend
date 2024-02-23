import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Compiler from "./pages/Compiler";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Header from "./common/Header";
import {Toaster} from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {RootState} from "@/redux/store";
import {userdata} from "./common/UserData";
import {errorCurrentuser, startCurrentuser, updateCurrentuser} from "./redux/slices/UserSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getdata = async () => {
      dispatch(startCurrentuser());
      const data = await userdata();
      if (data) {
        dispatch(updateCurrentuser(data.user));
      } else {
        dispatch(errorCurrentuser());
      }
    };

    getdata();
  }, []);

  return (
    <>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compiler/:id?" element={<Compiler />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
