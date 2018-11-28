import React, { Component } from "react";
import dateFns from "date-fns";
import Page from "../Page";
import "./Calendar.scss";
import { Link } from "react-router-dom";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      currentDate: new Date(),
      selectedDay: new Date(),
      selectedMonth: new Date()
    };
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="hdr">
        <div className="prev" onClick={this.prevMonth}>
          previous
        </div>
        <div className="curMonth">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="next" onClick={this.nextMonth}>
          <div>next</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth, {
      weekStartsOn: 1
    });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns
            .format(dateFns.addDays(startDate, i), dateFormat)
            .substring(0, 3)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate, currentDate } = this.state;
    const { match } = this.props;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const room = {
          room: match.params.roomid,
          building: match.params.buildingid,
          selectedDay: day.getDate(),
          selectedMonth: day.getMonth()+1
        }
        
        days.push(
          
            

          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                  ? "selected"
                  : dateFns.isSameDay(day, currentDate)
                    ? "currDate"
                    : ""
            }`}

            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
            //button
          > 
            <Link
              className="number"
              {...this.props}
              to={{
                pathname: "/calendar/" + (day.getMonth()+1) + "-" + cloneDay.getDate(),
                state: room
                  
               }}
            > 
              {formattedDate}
            </Link>
          </div>
          
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day,
      selectedDay: day.getDate(),
      selectedMonth: day.getMonth()+1
    });
    


  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <Page className="calPage">
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
      </Page>
    );
  }
}

export default Calendar;
