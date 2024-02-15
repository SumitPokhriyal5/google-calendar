import "../styles/topSection.css";
import { TiArrowSortedDown } from "react-icons/ti";
import { DatePicker as RangePicker } from "antd"; 
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
import { PiDotsThreeCircleVerticalDuotone } from "react-icons/pi";


const TopSection = ({formattedDate, handleDateChange}) => {
  
  return (
    <div>
      <div className="topBox">
        <div className="leftContainer">
          <p className="calenderHeading">CALENDAR</p>
          <div className="calendarContainer">
            <RangePicker
              className="calendarRangePicker"
              onChange={handleDateChange}
            />
            <div className="calendarInput">
              <span className="calendarText">{formattedDate}</span>
              <TiArrowSortedDown />
            </div>
          </div>
        </div>
        <div className="rightContainer">
          <FaExternalLinkAlt className="icon" />
          <IoClose className="icon" />
        </div>
      </div>
      <hr/>
      <div className="bottomBox">
        <div className="todayContainer">
          <p>Today</p>
          <div className="arrowIconContainer">
            <RiArrowLeftSLine className="icon" />
            <RiArrowRightSLine className="icon" />
          </div>
        </div>
        <div className="dotsIconContainer">
          <PiDotsThreeCircleVerticalDuotone className="icon" />
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default TopSection;
