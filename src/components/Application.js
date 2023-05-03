import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";


export default function Application(props) {

  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));


  useEffect(() => {
    Promise.all([
      axios.get('https://localhost:8001/api/days'),
      axios.get('https://localhost:8001/api/appointments')
    ]).then((resDays, resAppts) => {
      setState(prev => ({ ...prev, days: resDays.data, appointments: resAppts.data }));
    })
  }, []);

  const apptComponents = Object.values(appointments);
  const appointment = apptComponents.map(appt => {
    return (
      <Appointment
        key={appt.id}
        {...appt}
      />
    )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
