import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function updateSpots(state, id, appointments) {
    const days = [...state.days]
    const dayOfWeek = days.findIndex((day) => day.appointments.includes(id));
    const dayAppt = days[dayOfWeek].appointments;
    const spots = Object.keys(appointments).reduce((total, key) =>
    {
      const apptKey = appointments[key];
      if (dayAppt.includes(apptKey.id) && !apptKey.interview) {
        return total + 1;
      }
      return total;
    }, 0)
    days[dayOfWeek] = { ...days[dayOfWeek], spots}
    return days;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
    .put(`http://localhost:8001/api/appointments/${id}`, { interview })
    .then((res) => {
      const days = updateSpots(state, id, appointments);
      setState({ ...state, appointments, days })
    })
    .catch(error => console.log(error));
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
    .put(`http://localhost:8001/api/appointments/${id}`)
    .then((res) => {
      const days = updateSpots(state, id, appointments);
      setState({ ...state, appointments, days })
    })
    .catch(error => console.log(error));
  };

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, []);

  return { state, setDay, bookInterview, cancelInterview }
};
