import React from "react";
import axios from "__mocks__/axios";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByTestId,
  waitForElementToBeRemoved,
  queryByText,
  getByDisplayValue,
  } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application component", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, /saving/i));

    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    const days = getAllByTestId(container, "day");
    const day = days.find((day) => queryByText(day, "Monday") !== null);

    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find((el) =>
      queryByText(el, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, /delete/i));
    expect(
      getByText(appointment, /Are you sure you would like to delete?/i)
    ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, /confirm/i));
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() =>
      queryByText(appointment, /deleting/i)
    );

    const day = getAllByTestId(container, "day").find((el) =>
      queryByText(el, /monday/i)
    );
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find((el) =>
      queryByText(el, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, /edit/i));

    expect(getByDisplayValue(appointment, "Archie Cohen")).toBeInTheDocument();
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, /saving/i));
    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find((el) =>
      queryByText(el, /monday/i)
    );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, /Error Saving Appointment/i)
    );
    fireEvent.click(getByAltText(appointment, "Close"));

    expect(getByText(appointment, /interviewer/i)).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find((el) =>
      queryByText(el, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, /delete/i));
    expect(
      getByText(appointment, /Are you sure you would like to delete?/i)
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, /confirm/i));
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      getByAltText(appointment, /Loading/i)
    );

    fireEvent.click(getByAltText(appointment, /close/i));

    expect(getByText(appointment, /Archie Cohen/i)).toBeInTheDocument();
  });
});
