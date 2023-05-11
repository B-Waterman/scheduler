export function getDailyInfo(state, day, dayObject) {
  const dayArray = [];
  const dayObjectID = state.days.find((element) => element.name === day)?.appointments || undefined;

  dayObjectID && dayObjectID.forEach((id) => {
    dayArray.push(dayObject[id])
  });

  return dayArray;
}

export function getAppointmentsForDay(state, day) {
  return getDailyInfo(state, day, state.appointments);
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
  return getDailyInfo(state, day, state.interviewers);
};
