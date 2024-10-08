import "./controls.css";
import { Link } from "react-router-dom";

export const GoBackButton = () => {
  return (
    <div className="control">
      <Link to={"/"} className="btn">
        <svg
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
        >
          <path
            d="M6.5 2.499l-.354-.354-.353.354.353.353L6.5 2.5zm1-.5H7v1h.5v-1zM2 8.495v-.5H1v.5h1zM8.145.146l-1.999 2 .708.706L8.853.854 8.145.146zM6.146 2.852l2 1.999.707-.707-2-1.999-.707.707zM7.5 3C10.537 3 13 5.461 13 8.496h1A6.499 6.499 0 007.5 2v1zM13 8.495a5.499 5.499 0 01-5.5 5.496v1c3.589 0 6.5-2.909 6.5-6.496h-1zM7.5 13.99A5.499 5.499 0 012 8.495H1a6.499 6.499 0 006.5 6.496v-1z"
            fill="currentColor"
          ></path>
        </svg>
        go back
      </Link>
    </div>
  );
};
