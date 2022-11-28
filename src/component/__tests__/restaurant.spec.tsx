import { render, screen } from "@testing-library/react";
import React from "react";
import { Restaurant } from "../restaurants";
import { BrowserRouter } from "react-router-dom";

describe("<Restaurant />", () => {
  it("renders Ok with props", () => {
    const restaurantProps = {
      id: "1",
      name: "name",
      categoryName: "categoryName",
      coverImage: "lala",
    };
    const {
      debug,
      container: { firstChild },
    } = render(
      <BrowserRouter>
        <Restaurant {...restaurantProps} />
      </BrowserRouter>
    );
    
    screen.getByText(restaurantProps.name);
    expect(firstChild).toHaveAttribute("href", "/restaurant/1");
  });
});
