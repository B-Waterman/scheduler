import React from "react";

//Allows user to choose which time slot to book with interviewer
export default function Empty({onAdd}) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
      />
    </main>
  );
}
