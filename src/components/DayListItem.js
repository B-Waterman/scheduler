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

export default function DayListItem({name, selected, setDay, spots}) {
  const spotsRemaining = formatSpots(spots);

  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots
  });
  return (
    <li onClick={() => setDay(name)} className={dayClass} selected={selected}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spotsRemaining}</h3>
    </li>
  );
}
