import React from "react";

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

//interview may be a lone var or prop. All other props destructured inline
export default function Appointment({ id, name, value, time, interviewers, bookInterview, cancelInterview, ...rest }) {

  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    rest.interview ? SHOW : EMPTY);

  //Save interview - takes in the interivew object and name. A new interview appointment transitions from saving to to show once API call is completed.
  function saveInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(error => {
        transition(ERROR_SAVE, true)
      });
  }

  //Delete interview - a new interview appointment transitions to deleting, waits for a cancellation request to return from server then transitions to empty.
  function deleteInterview() {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => {
        transition(ERROR_DELETE, true)
      });
  }


  return (
    <article className="appointment">
      <Header time={time} />

      {mode === SHOW && (
        <Show
          id={id}
          student={rest.interview.student}
          interviewer={rest.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={saveInterview}
        />
      )}

      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}

      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete this interview? It may not be available later."
          onConfirm={deleteInterview}
          onCancel={back}
        />
      )}

      {mode === EDIT && (
        <Form
          name={name ? name : rest.interview.student}
          interviewer={rest.interview.interviewer}
          interviewers={interviewers}
          onCancel={back}
          onSave={saveInterview}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Error: Cannot save interview appointment."
          onClose={back}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message="Error: Cannot delete interview appointment."
          onClose={back}
        />
      )}
    </article>
  );
};
