import {CompilerSliceStateType, updateCurrentLanguage} from "@/redux/slices/CompilerSlice";
import {RootState} from "@/redux/store";
import {Code, Copy, SaveAll, Share2, X} from "lucide-react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {toast} from "react-hot-toast";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const HelperHeader = () => {
  const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode);
  const user = useSelector((state: RootState) => state.userSlice.user);
  const [sharebox, setShareBox] = useState<Boolean>(false);
  const [shareBtn, setShareBtn] = useState<boolean>(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage);

  const changelang = (e: any): void => {
    dispatch(updateCurrentLanguage(e.target.value as CompilerSliceStateType["currentLanguage"]));
  };

  const urlId = useParams();
  useEffect(() => {
    if (urlId.id) {
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
  }, [urlId]);

  const saveCode = async () => {
    const dataSend = {fullCode, userId: user._id};
    try {
      const response = await axios.post("https://hcj-compiler-backend.vercel.app/compiler/save", {fullCode, dataSend});

      if (response.data.success) {
        navigate(`/compiler/${response.data.url}`, {replace: true});
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="  h-[50px] bg-slate-950 flex justify-between items-center w-full px-5 ">
      <section className=" flex items-center gap-3 justify-center ">
        <div onClick={saveCode} className="  bg-green-600  text-slate-200 py-2 px-3 rounded-md  cursor-pointer  flex items-center justify-between gap-2  ">
          <p className=" hidden md:flex text-[0.9rem] tracking-wider ">Save</p>
          <SaveAll />
        </div>

        {shareBtn && (
          <div onClick={() => setShareBox(true)} className="  bg-green-600  text-slate-200   py-2 px-3 rounded-md  cursor-pointer  flex items-center justify-between gap-2   ">
            <p className="hidden md:flex text-[0.9rem] tracking-wider  ">Share</p>
            <Share2 size={18} />
          </div>
        )}
      </section>

      {/*  */}

      {sharebox && (
        <div className=" fixed top-1/3 right-1/2  bg-black text-white z-50 w-[95%] md:w-[50%] lg:w-[35%] rounded-md transform translate-x-1/2  px-5 py-5 ">
          <p className=" flex items-center justify-center text-left tracking-widest italic text-[1rem] text-slate-200">
            <Code className=" mr-2 " /> Share your code!
          </p>

          <div className=" w-full my-3   py-2   bg-gray-700 flex items-center justify-between gap-5 px-3 ">
            <p className=" text-[0.8rem]  tracking-wide overflow-hidden text-gray-300 ">{window.location.href}</p>
            <Copy
              size={16}
              className=" cursor-pointer font-bold "
              onClick={() => {
                window.navigator.clipboard.writeText(window.location.href);
                toast.success("URL Copied to your clipboard!");
                setShareBox(false);
              }}
            />
          </div>

          <p className=" text-[0.7rem] text-slate-300 italic tracking-widest text-center w-full mt-3 ">Share code with your friends, and keep coding!</p>

          <X size={18} className=" cursor-pointer text-gray-100 absolute top-3 right-3 " onClick={() => setShareBox(!sharebox)} />
        </div>
      )}

      {/*  */}

      <section className=" flex items-center justify-center gap-2  ">
        <p className=" text-slate-200 tracking-wider italic text-[0.8rem] ">Language : </p>
        <select name="cars" id="cars" className=" text-center  outline-none  text-[0.8rem] py-2 bg-gray-900 text-slate-200 italic tracking-wide px-5 rounded-md " defaultValue={currentLanguage} onChange={changelang}>
          <option value="html" className=" text-left py-1 ">
            HTML
          </option>
          <option value="css" className=" text-left py-1 ">
            CSS
          </option>
          <option value="javascript" className=" text-left py-1  ">
            JavaScript
          </option>
        </select>
      </section>
    </div>
  );
};

export default HelperHeader;
