import { render, screen } from "@testing-library/react";
import React from "react";
import { Button } from "../button";

describe("<Button />", () => {
  it("should render Ok with props", () => {
    const { debug, rerender } = render(
      <Button canClick={true} loading={false} actionText="test"></Button>
    );
    screen.getByText("test");

    rerender(
      <Button canClick={true} loading={true} actionText="test"></Button>
    );

    screen.getByText("Loading...");
  });

  it("should display loading", () => {
    const {
      container: { firstChild },
    } = render(
      <Button canClick={false} loading={true} actionText="test"></Button>
    );

    screen.getByText("Loading...");
    expect(firstChild).toHaveClass("pointer-events-none");
  });
});
