import React from "react";
import Sidebar from "./components/sidebar/sideBar";
import Main from "./components/page/main";
import run from "./config/gemini";

const App =   () => {
  // const reap = await run("What is react js")
  // console.log(reap);
  
  return (
    <>
    <Sidebar/>
    <Main/>
    </>
  );
};

export default App;
