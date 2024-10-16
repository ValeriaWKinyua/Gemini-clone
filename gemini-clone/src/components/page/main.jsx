// Main.jsx

import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism"; // You can choose any style you prefer
import "./main.css";
import { assets } from "../../images/assets";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSent,
    showResults,
    loading,
    resultData,
    input,
    setInput,
    recentPrompt,
  } = useContext(Context);

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
              <div
                className="card"
                onClick={() =>
                  onSent("Suggest beautiful places for an oncoming road trip")
                }
              >
                <p>Suggest beautiful places for an oncoming road trip</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onSent("Briefly summarize this concept: urban planning")
                }
              >
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onSent(
                    "Brainstorm team bonding activities for a work retreat"
                  )
                }
              >
                <p>Brainstorm team bonding activities for a work retreat</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onSent("Improve the readability of the following code")
                }
              >
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="results">
            <div className="result-title">
              <img src={assets.user_icon} alt="User" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <ReactMarkdown
                  children={resultData}
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={okaidia}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="main-bottom">
        <div className="search-box">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Enter a prompt here"
            disabled={loading} // Disable input when loading
          />
          <div>
            <img src={assets.gallery_icon} alt="Gallery Icon" />
            <img src={assets.mic_icon} alt="Mic Icon" />
            {input ? (
              <img
                onClick={() => {
                  if (!loading) {
                    onSent(); // Send without arguments to use the input value
                  }
                }}
                src={assets.send_icon}
                alt="Send Icon"
                style={{
                  opacity: loading ? 0.5 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
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
