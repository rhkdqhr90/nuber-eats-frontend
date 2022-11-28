import { render, waitFor, screen } from "@testing-library/react";
import React from "react";
import { Header } from "../header";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { ME_QUERY } from "../../hooks/userMe";

describe("<Header />", () => {
  it("render verify Banner", async () => {
    await waitFor(async () => {
      const { debug } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "",
                    role: "",
                    verified: false,
                  },
                },
              },
            },
          ]}
        >
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </MockedProvider>
      );
      debug();
      await new Promise((resolve) => setTimeout(resolve, 0));
      screen.getByText("Please verify your email");
    });
  });
  it("render without verify Banner", async () => {
    await waitFor(async () => {
      const { debug } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "",
                    role: "",
                    verified: true,
                  },
                },
              },
            },
          ]}
        >
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </MockedProvider>
      );

      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });
});
