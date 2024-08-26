import DailyInfo from "./DailyInfo/DailyInfo.jsx";
import MonthInfo from "./DailyInfo/MonthInfo/MonthInfo.jsx";
import UserPanel from "./UserPanel/UserPanel.jsx";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { calculateFormattedDate } from "../../../constants/constants.js";
import { fetchWaterDay } from "../../../redux/water/operations.js";

function WaterDetailedInfo({
  chosenDay,
  setCurrentDate,
  setCurrentYear,
  currentMonth,
  setCurrentMonth,
  currentYear,
  currentDate,
  setChosenDay,
}) {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchWaterDay({ day: chosenDay, month: currentMonth, year: currentYear })
    );
  }, [chosenDay, currentMonth, currentYear, dispatch]);

  let chosenDate = (day) => {
    setChosenDay(day);
  };

  return (
    <div>
      <UserPanel />
      <DailyInfo
        chosenDay={chosenDay}
        setChosenDay={setChosenDay}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
        chosenDate={chosenDate}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <MonthInfo
        chosenDate={chosenDate}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentYear={currentYear}
        chosenDay={chosenDay}
        setCurrentYear={setCurrentYear}
      />
    </div>
  );
}

export default WaterDetailedInfo;
