import { render, screen } from "@testing-library/react";
import React from "react";
import { FormError } from "../form-error";

describe("<FormError/>", () => {
  it("render Ok with props", () => {
    render(<FormError errorMessage="test" />);
    screen.getByText("test");
  });
});
