import Calendar from "./Calendar/Calendar";
import CalendarPagination from "./CalendarPagination/CalendarPagination";
import css from "./MonthInfo.module.css";

function MonthInfo() {
  // const date = chooseBiggerDate(day, month)
  return (
    <>
      <div className={css.monthAndPagination}>
        <p>Month</p>
        <CalendarPagination />
      </div>

      <Calendar />
    </>
  );
}

export default MonthInfo;
