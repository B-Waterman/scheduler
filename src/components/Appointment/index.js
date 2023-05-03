import React from "react";

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";


export default function Appointment({ time, interview, interviewers, id, name, value, bookInterview, cancelInterview }) {

  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING"

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY);


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview);
    transition(SAVING)
    Promise.resolve(bookInterview(id, interview))
      .then(() => transition(SHOW))
      .catch(error => console.log(error));
  }

  function deleteInterview() {
    transition(DELETING);
    Promise.resolve(cancelInterview(id))
      .then(() => transition(EMPTY))
      .catch(error => console.log(error));
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          id={id}
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={deleteInterview}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers}
          name={name}
          value={value}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message={"Saving"}
        />
      )}
      {mode === DELETING && (
        <Status
          message={"Deleting"}
        />
      )}
    </article>
  );
};
