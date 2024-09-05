import dayjs from "dayjs";
import "./time-items.css";
import { useTimeContext } from "../../TimeContext";

const calculateTimeItems = (time, sleepCycles, sleepOnsetTime, subtract = false) => {
  const cycleTime = 90;
  const timeItems = [];

  for (let i = 0; i < sleepCycles; i++) {
    subtract
      ? timeItems.push(
        dayjs(time)
          .subtract(cycleTime * (i + 1) + sleepOnsetTime, "m")
          .toDate()
      )
      : timeItems.push(
        dayjs(time)
          .add(cycleTime * (i + 1) + sleepOnsetTime, "m")
          .toDate()
      );
  }
  return timeItems.reverse();
};

export const TimeItems = ({ time, subtract }) => {
  const { sleepCycles, sleepOnsetTime } = useTimeContext();

  console.log("time items - TIME:", time);
  if (!time) {
    console.log("NO TIME");
    return null;
  }

  const items = calculateTimeItems(time, sleepCycles, sleepOnsetTime, subtract);

  return (
    <section
      className="time-items"
    >
      {items &&
        items.map((item, i) => {
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
}