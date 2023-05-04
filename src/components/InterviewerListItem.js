import React from "react";
import classNames from "classnames";

import "./InterviewerListItem.scss"

export default function InterviewerListItem({selected, setInterviewer, name, id, avatar}) {

  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  let imageClass = classNames("interviewers__item-image", {
    "interviewers__item-image--selected": selected
  });

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        className={imageClass}
        src={avatar}
        alt={id}
      />
      {selected && name}
    </li>
  );
};
