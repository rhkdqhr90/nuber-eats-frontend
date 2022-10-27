import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Restaurants } from "../pages/client/restaurant";
import { Header } from "../component/header";
import { useMe } from "../hooks/userMe";
import { NotFount } from "../pages/404";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";

const ClienteRoutes = [
  <Route key={1} path="/" element={<Restaurants></Restaurants>}></Route>,
  <Route key={2} path="/confirm" element={<ConfirmEmail />}></Route>,
  <Route key={3} path="/edit-profile" element={<EditProfile />}></Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className=" h-screen flex justify-center items-center">
        <span className=" font-medium text-xl tracking-wide">Loading....</span>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {data.me.role === "Client" && ClienteRoutes}
        <Route path="*" element={<NotFount />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
