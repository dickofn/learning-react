/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

function Loader() {
  const spinAnimation = keyframes`
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }    
  `;

  const loaderStyle = css`
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid #3498db;
    width: 50px;
    height: 50px;
    -webkit-animation: ${spinAnimation} 2s linear infinite; /* Safari */
    animation: ${spinAnimation} 2s linear infinite;
  `;

  return (
    <div className="flex justify-center">
      <div css={loaderStyle}></div>
    </div>
  );
}

export default Loader;
