import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit/react";

export interface CompilerSliceStateType {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
  currentLanguage: "html" | "css" | "javascript";
}

const initialState: CompilerSliceStateType = {
  fullCode: {
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
  },
  currentLanguage: "html",
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (state, action: PayloadAction<CompilerSliceStateType["currentLanguage"]>) => {
      state.currentLanguage = action.payload;
    },
    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },
    updateFullCode: (state, action: PayloadAction<CompilerSliceStateType["fullCode"]>) => {
      state.fullCode = action.payload;
    },
  },
});

export default compilerSlice.reducer;
export const {updateCurrentLanguage, updateCodeValue, updateFullCode} = compilerSlice.actions;
