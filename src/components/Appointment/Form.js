import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



//A form to track the page's text input value & selected interviewer
export default function Form({interviewers, name, onCancel, onSave, ...rest}) {
  const [student, setStudent] = useState(rest.student || "");
  const [interviewer, setInterviewer] = useState(rest.interviewer || null);

  //Helper Functions
  const reset = function() {
    setStudent("")
    setInterviewer(null)
  };

  const cancel = function() {
    reset()
    onCancel()
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            onChange={(event) => setStudent(event.target.value)}
            placeholder="Enter Student Name"
            student={rest.student}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          interviewer={rest.interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => onSave(rest.student, rest.interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
};
