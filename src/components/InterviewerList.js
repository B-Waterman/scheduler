import React from "react";
import './InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList({interviewers, onChange, value}) {

  // console.log("InterviewerList", InterviewerList);

  const renderedInterviewers = interviewers.map(({id, name, avatar}) => {
    return (
      <InterviewerListItem
        key={id}
        name={name}
        avatar={avatar}
        setInterviewer={() => onChange(id)}
        selected={id === value}
      />
    )
  })

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewers</h4>
    <ul className="interviewers__list">{interviewers}</ul>
  </section>
  )
};
