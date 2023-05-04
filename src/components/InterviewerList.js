import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import './InterviewerList.scss';

export default function InterviewerList({onChange, value, ...rest}) {
  const renderedInterviewers = rest.interviewers.map(({id, name, avatar}) => {

    return (
      <InterviewerListItem
        key={id}
        name={name}
        avatar={avatar}
        selected={id === value}
        setInterviewer={() => onChange(id)}
      />
    )
  })

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewers</h4>
    <ul className="interviewers__list">{renderedInterviewers}</ul>
  </section>
  )
};
