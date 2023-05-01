import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



//A form to track the page's text input value & selected interviewer
export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  //Helper Functions
  const reset = function() {
    setStudent("")
    setInterviewer(null)
  };

  const cancel = function() {
    reset()
    props.onCancel()
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={() => this.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            onChange={() => setStudent(this.target.value)}
            placeholder="Enter Student Name"
            student={student}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
};