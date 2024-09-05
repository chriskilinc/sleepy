import "./controls.css";
import { useTimeContext } from "../../TimeContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export const ControlButtons = () => {
  const { selectedTime } =
    useTimeContext();

  const getTime = () => {
    return encodeURIComponent(dayjs(selectedTime).format("HH:mm"));
  };

  return (
    <div className="controls">
      <div className="control segmented">
        <Link
          to={`/sleep/${getTime()}`}
          state={{ test: "testing" }}
          className="btn"
        >
          <svg
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path
              d="M1.66 11.362A6.5 6.5 0 007.693.502a7 7 0 11-6.031 10.86z"
              stroke="currentColor"
              strokeLinejoin="round"
            ></path>
          </svg>
          Go to bed
        </Link>
        <Link to={`/wake/${getTime()}`} className="btn">
          <svg
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path
              d="M7.5 1.5v-1m0 13.99v-.998m6-5.997h1m-13 0h-1m2-4.996l-1-1m12 0l-1 1m-10 9.993l-1 1m12 0l-1-1m-2-4.997a2.999 2.999 0 01-3 2.998 2.999 2.999 0 113-2.998z"
              stroke="currentColor"
              strokeLinecap="square"
            ></path>
          </svg>
          Wake up
        </Link>
      </div>
      <div className="control">
        <Link to={`/sleep`} className="btn">
          If i go to bed now
        </Link>
      </div>
    </div>
  );
};
