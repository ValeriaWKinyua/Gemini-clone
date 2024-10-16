import React, { useContext } from "react";
import "./main.css";
import { assets } from "../../images/assets";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSent,
    showResults, // Import showResults from context
    loading,
    resultData,
    input,
    setInput,
    recentPrompt,
  } = useContext(Context);

  // Debugging log to check the value of showResults during rendering
  console.log("showResults in Main component:", showResults);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>

      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places for an oncoming road trip</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for a work retreat</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="results">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
      </div>
      {/* {loading ? <p>Loading...</p> : <p>{resultData}</p>} */}

      <div className="main-bottom">
        <div className="search-box">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Enter a prompt here"
          />
          <div>
            <img src={assets.gallery_icon} alt="Gallery Icon" />
            <img src={assets.mic_icon} alt="Mic Icon" />
            {input ? (
              <img
                onClick={() => onSent(input)}
                src={assets.send_icon}
                alt="Send Icon"
              />
            ) : null}
          </div>
        </div>
        <p className="bottom-info">
          Gemini may display inaccurate info, including about people, so double
          check its responses. Your privacy and Gemini Apps.
        </p>
      </div>
    </div>
  );
};

export default Main;
