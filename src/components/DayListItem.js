import React from "react";

import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayItemClass = classNames("dayItem", {
    "dayItem--selected": props.selected,
    "dayItem--full": !props.spots
  });
  return (
    <li
      className={dayItemClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">Day Name</h2> 
      <h3 className="text--light">X spots remaining</h3>
    </li>
  );
};