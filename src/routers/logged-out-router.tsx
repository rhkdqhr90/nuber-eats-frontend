import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFount } from "../pages/404";
import { CreateAccount } from "../pages/create-account";
import { Login } from "../pages/login";

export const LoggedOutRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-account" element={<CreateAccount />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="*" element={<NotFount />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
