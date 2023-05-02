import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

const formatSpots = function(spots) {
  if(!spots) {
    return "no spots remaining";
  }
  if(spots === 1) {
    return "1 spot remaining";
  }
  return `${spots} spots remaining`;
};

export default function DayListItem(props) {
  const spotsRemaining = formatSpots(props.spots);
  let dayItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  return (
    <li
      className={dayItemClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsRemaining}</h3>
    </li>
  )
};
