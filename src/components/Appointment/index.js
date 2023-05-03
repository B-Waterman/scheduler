import React from "react";

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

const SHOW = "SHOW";
const EMPTY = "EMPTY";
const CREATE = "CREATE";

export default function Appointment({time, interview, name, value}) {

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && <Form interviewers={[]} name={name} value={value} onCancel={back} />}
    </article>
  );
};
