import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../utils/useRedux";

const SafeRoute = (ReceivedComponent: React.FC) => {
  const NewComponent = () => {
    const token = useAppSelector((state) => state.Auth.token);
    if (token) return <ReceivedComponent />;
    return <Navigate to={"/"} />;
  };
  return NewComponent;
};

export default SafeRoute;
