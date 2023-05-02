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

  console.log(props);

  const spotsRemaining = formatSpots(props.spots);

  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsRemaining}</h3>
    </li>
  );
}
