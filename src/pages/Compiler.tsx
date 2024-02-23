import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import RenderCode from "@/components/RenderCode";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {updateFullCode} from "@/redux/slices/CompilerSlice";
import {RootState} from "@/redux/store";
import axios from "axios";
import {useEffect} from "react";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

const Compiler = () => {
  const urlId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userSlice.user);

  const loadCode = async () => {
    try {
      if (urlId) {
        const response = await axios.get(`https://hcj-compiler-backend.vercel.app/compiler/${urlId.id}`);
        if (response.data.message) {
          dispatch(updateFullCode(response.data.code));
        } else {
          toast.error("Error fetching data!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadUserCode = async () => {
    axios
      .get(`http://localhost:4001/user/${user._id}`)
      .then((response) => {
        console.log(response.data.url);
        if (response.data.url) {
          navigate(`/compiler/${response.data.url}`, {replace: true});
        } else {
          const temp = {
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>HCJ Compiler</title>
              <link rel="stylesheet" href="styles.css">
            </head>
            <body>
              <div class="container">
                <h1 class="heading">HCJ Compiler</h1>
                <div class="points">
                  <p class="point"> Share your code anonymously.</p>
                  <p class="point"> Login to keep track of your last code.</p>
                </div>
              </div>
              <script src="script.js"></script>
            </body>
            </html>
            
            `,
            css: `
            body, html {
              margin: 0;
              padding: 0;
              height: 100%;
              font-family: Arial, sans-serif;
              background-color: #1a1a1a;
              color: #fff;
              overflow: hidden;
            }
            
            .container {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            
            .heading {
              font-size: 3.5rem;
              margin-bottom: 20px;
              text-align: center;
              letter-spacing : 1px;
              animation: fadeIn 2s ease-in-out;
            }
            
            .points {
              text-align: center;
              animation: slideIn 2s ease-in-out;
            }
            
            .point {
              font-size: 1rem;
              letter-spacing : 3px;
              margin-bottom: 10px;
            }
            
            @keyframes fadeIn {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }
            
            @keyframes slideIn {
              0% { transform: translateY(-50px); }
              100% { transform: translateY(0); }
            }
              
            `,
            javascript: ``,
          };

          dispatch(updateFullCode(temp));
        }
      })
      .catch(() => {
        toast.error("Error fetching code!");
      });
  };

  useEffect(() => {
    if (urlId.id) {
      loadCode();
    }

    if (user._id && !urlId.id) {
      loadUserCode();
    }
  }, [urlId.id, user._id]);

  return (
    <ResizablePanelGroup direction="horizontal" className="">
      <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[100dvw] md:min-w-fit lg:min-w-[450px] " defaultSize={55}>
        <HelperHeader />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[100dvw] md:min-w-fit lg:min-w-[450px]  " defaultSize={45}>
        <RenderCode />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Compiler;
