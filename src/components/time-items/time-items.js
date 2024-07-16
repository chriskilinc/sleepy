import dayjs from "dayjs";
import "./time-items.css";
import { useTimeContext } from "../../TimeContext";

export const TimeItems = () => {
  const { timeItems } = useTimeContext();

  return (
    <section
      className="time-items"
      visible={(timeItems && timeItems.length > 0).toString()}
    >
      {timeItems &&
        timeItems.map((item, i) => {
          const key = `time-item-${i}`;
          const recommended = i <= 1;

          return (
            <div
              key={key}
              className="time-item"
              recommended={recommended.toString()}
            >
              <p>
                {dayjs(item).format("HH:mm")}{" "}
                <span className="recommended-tooltip">recommended</span>
              </p>
            </div>
          );
        })}
    </section>
  );
};
