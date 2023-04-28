import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  let imageClass = classNames("interviewers__item-image", {
    "interviewers__item-image--selected": props.selected
  })

  return (
    <li
      className={interviewerClass}
      onClick={() => props.setInterviewer(props.name)}
    >
      <img
      className={imageClass}
      src="https://i.imgur.com/LpaY82x.png"
      alt="Sylvia Palmer"
      />
      {props.name}
    </li>
  )
};