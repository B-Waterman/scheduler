import React from "react";

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

const SHOW = "SHOW";
const EMPTY = "EMPTY";

export default function Appointment({time, interview}) {

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  );
};
