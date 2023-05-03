export function getAppointmentsForDay(state, day) {
  const dayAppointments = [];
  const dayAppointmentID = state.days.find((element) => element.name === day)?.appointments;

  dayAppointmentID && dayAppointmentID.forEach((id) => {
    dayAppointments.push(state.appointments[id])
  });

  return dayAppointments;
};

export function getInterview(state, interview) {
  const interviewSlot = interview ? {...interview} : null
  if (interviewSlot) {
    interviewSlot.interviewer =
  state.interviewers[interviewSlot.interviewer]
  }
  return
};
