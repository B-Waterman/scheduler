import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



//A form to track the page's text input value & selected interviewer
export default function Form({interviewers, onCancel, onSave, ...rest}) {
  const [student, setStudent] = useState(rest.student || "");
  const [interviewer, setInterviewer] = useState(rest.interviewer || null);
  const [error, setError] = useState("");

  //Helper Functions
  const reset = function() {
    setStudent("")
    setInterviewer(null)
  };

  const cancel = function() {
    reset()
    onCancel()
  };

  const checkContent = function(){
    if (!student || student === "" ) {
      setError("Please enter a student name");
      return;
    }
    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            onChange={(event) => setStudent(event.target.value)}
            placeholder="Enter Student Name"
            value={student}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          interviewer={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={checkContent}>Save</Button>
        </section>
      </section>
    </main>
  );
}
