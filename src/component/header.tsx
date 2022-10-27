import React from "react";
import { useMe } from "../hooks/userMe";
import uber from "../images/uber.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className=" bg-red-500 p-3 text-center text-xs text-white">
          <span>Please verify your email</span>
        </div>
      )}
      <header className="  py-4">
        <div className="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={uber} alt="우버이미지" className=" w-24 " />
          </Link>
          <span className=" text-xs">
            <Link to="/edit-profile">
              <FontAwesomeIcon
                icon={faUser}
                className=" text-xl"
              ></FontAwesomeIcon>
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
