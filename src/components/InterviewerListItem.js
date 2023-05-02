import React from "react";
import classNames from "classnames";

import "./InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  let imageClass = classNames("interviewers__item-image", {
    "interviewers__item-image--selected": props.selected
  })

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className={imageClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};
