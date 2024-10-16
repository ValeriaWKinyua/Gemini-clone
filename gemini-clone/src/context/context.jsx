import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResults, setShowResults] = useState(false); // Initial value is false
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 20 * index);
  };

  const onSent = async (prompt) => {
    // if (!input) return;
    setResultData("");
    setLoading(true);
    setShowResults(true); // Update showResults to true when submitting the prompt


    
    

    let response = [];
    if (prompt !== undefined) {
        
      response = await run(prompt);
     

      setRecentPrompt(prompt);
      
      
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
       
    }
    // setPrevPrompts((prev) => [...prev, input]);
    // console.log("showResults after onSent:", showResults);
    // const response = await run(input);

    
    
    let resposeArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < resposeArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += resposeArray[i];
      } else {
        newResponse += "<b>" + resposeArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("<br>");
    let newResponseArray = newResponse2.split("");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + "");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    setRecentPrompt,
    loading,
    resultData,
    input,
    setInput,
    showResults, // Make sure showResults is included in the context
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
