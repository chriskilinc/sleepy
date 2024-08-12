import { createContext, useContext, useState } from "react";
import dayjs from "dayjs";

const TimeContext = createContext({});

export const TimeProvider = ({ children }) => {
  const sleepOnsetTimeDefault = 15;
  const DESC_DEFAULT = "This is the time I want to: ";

  const [currentDescription, setCurrentDescription] = useState(DESC_DEFAULT);
  const [selectedTime, setSelectedTime] = useState(dayjs(new Date()));
  const [time, setTime] = useState(dayjs(new Date()));
  const [sleepOnsetTime, setSleepOnsetTime] = useState(sleepOnsetTimeDefault); //  IDEA: should be customizable
  const [timeItems, setTimeItems] = useState([]);
  const [sleepCycles, setSleepCycles] = useState(6);

  const calculateTimeItems = (time, subtract = false) => {
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
    setTimeItems(timeItems.reverse());
  };

  const onWakeUp = () => {
    calculateTimeItems(selectedTime, true);
    setCurrentDescription(
      `If I want to wake up at ${dayjs(selectedTime).format(
        "HH:mm"
      )} I should go to bed around..`
    );
  };

  const onGoToBed = () => {
    calculateTimeItems(selectedTime);
    setCurrentDescription(
      `If I go to bed at ${dayjs(selectedTime).format(
        "HH:mm"
      )} I should wake up around..`
    );
  };

  const onCurrentBedtime = (e) => {
    const currentTime = new Date();
    calculateTimeItems(currentTime);
    setCurrentDescription(
      `If I go to bed now at ${dayjs(currentTime).format(
        "HH:mm"
      )} I should wake up around..`
    );
  };

  const onReset = (e) => {
    setTimeItems([]);
    setCurrentDescription(DESC_DEFAULT);
    console.log("location",window.location) // TODO
  };

  return (
    <TimeContext.Provider
      value={{
        sleepOnsetTime,
        setSleepOnsetTime,
        sleepOnsetTimeDefault,
        onCurrentBedtime,
        onReset,
        onGoToBed,
        onWakeUp,
        currentDescription,
        setCurrentDescription,
        timeItems,
        selectedTime,
        setSelectedTime,
        time,
        setTime,
        sleepCycles
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export const useTimeContext = () => useContext(TimeContext);
