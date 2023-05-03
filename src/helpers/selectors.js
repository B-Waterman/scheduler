export function getAppointmentsForDay(state, day) {
  const dayAppointments = [];
  const dayAppointmentID = state.days.find((element) => element.name === day)?.appointments || undefined;

  dayAppointmentID && dayAppointmentID.forEach((id) => {
    dayAppointments.push(state.appointments[id])
  });

  return dayAppointments;
};
