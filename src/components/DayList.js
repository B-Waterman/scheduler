import React from "react";

import DayListItem from "./DayListItem";

export default function DayList({onChange, value, days}) {
  const renderedDays = days.map(({id, name, spots}) => {
    return (
      <DayListItem
        key={id}
        name={name}
        spots={spots}
        setDay={onChange}
        selected={name === value}
      />
      )
    });

  return <ul>{renderedDays}</ul>
};
