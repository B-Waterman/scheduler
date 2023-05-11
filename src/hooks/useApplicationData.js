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
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, []);

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
    .put(`/api/appointments/${id}`, { interview })
    .then(() => {
      const days = updateSpots(state, id, appointments);
      setState({ ...state, appointments, days })
    })
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
    .delete(`/api/appointments/${id}`)
    .then(() => {
      const days = updateSpots(state, id, appointments);
      setState({ ...state, appointments, days })
    })
  };


  return { state, setDay, bookInterview, cancelInterview }
};
