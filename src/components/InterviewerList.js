import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";

import './InterviewerList.scss';

export default function InterviewerList({interviewers, onChange, value}) {
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    interviewers: PropTypes.array.isRequired
  };

  const renderedInterviewers = interviewers.map(({id, name, avatar}) => {
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
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{renderedInterviewers}</ul>
  </section>
  )
};
