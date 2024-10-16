import React from "react";
import Sidebar from "./components/sidebar/sideBar";
import Main from "./components/page/main";
import run from "./config/gemini";

const App =   () => {
  // const reap = await run("What is react js")
  // console.log(reap);
  
  return (
    <div style={{display:'flex', width:'100%'}} >
      <Sidebar/>

     
    <Main/>
    </div>
  );
};

export default App;
