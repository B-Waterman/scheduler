import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewerObject => {
    return (
      <InterviewerListItem
        key={interviewerObject.id}
        name={interviewerObject.name}
        avatar={interviewerObject.avatar}
        selected={interviewerObject.id === props.value}
        setInterviewer={(event) => props.onChange(interviewerObject.id)}
      />
    )
  });
  
  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewers</h4>
    <ul className="interviewers__list">{interviewers}</ul>
  </section>
  )
};