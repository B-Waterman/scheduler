export function getAppointmentsForDay(state, day) {
  const dayAppointments = [];
  const dayAppointmentID = state.days.find((element) => element.name === day)?.appointments || undefined;

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
  return interviewSlot;
};

export function getInterviewersForDay(state, day) {
  const dayInterviewers = [];
  const dayInterviewersID = state.days.find((element) => element.name === day)?.interviewers || undefined;

  dayInterviewersID && dayInterviewersID.forEach((id) => {
    dayInterviewers.push(state.interviewers[id])
  });

  return dayInterviewers;
};
