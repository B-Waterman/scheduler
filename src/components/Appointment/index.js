import React, { useEffect } from "react";

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

const SHOW = "SHOW";
const EMPTY = "EMPTY";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment({time, interview, id, name, value, bookInterview}) {

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY);
    useEffect(() => {
      if (interview && mode === EMPTY) {
        transition
      }
    });

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
  }

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
