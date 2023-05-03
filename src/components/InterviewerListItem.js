import React from "react";
import classNames from "classnames";

import "./InterviewerListItem.scss"

export default function InterviewerListItem({selected, setInterviewer, id, name, avatar}) {

  const Classes = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  })
  // console.log(
  // let interviewerClass = classNames("interviewers__item", {
  //   "interviewers__item--selected": selected
  // },)

  // let imageClass = classNames("interviewers__item-image", {
  //   "interviewers__item-image--selected": selected
  // })

  return (
    <li className={Classes} onClick={setInterviewer}>
      <img
        className={"interviewers__item-image"}
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
};
