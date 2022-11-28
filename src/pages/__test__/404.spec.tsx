import { render, waitFor } from "@testing-library/react";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { NotFound } from "../404";
import { BrowserRouter } from "react-router-dom";

describe("<NotFound />", () => {
  it("render Ok",async () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </HelmetProvider>
    );
   await waitFor(() => {
      expect(document.title).toBe("Not Found | Nuber-eats");
   })
  });
});
