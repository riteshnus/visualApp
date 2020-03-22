import React from "react";

const Loader = () => {
    return (
      <div className={"loader-wrapper"}>
          <div className={"loader"} />
          <style jsx>
            {`
              .loader-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 80vh;
                background-color: #da27271a;
                padding: 50px 0;
                align-self: center;
              }
              .loader {
                border: 16px solid #f3f3f3;
                border-top: 16px solid #3498db;
                border-radius: 50%;
                width: 120px;
                height: 120px;
                animation: spin 2s linear infinite;
              }
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}
          </style>
      </div>
    );
}

export default Loader;