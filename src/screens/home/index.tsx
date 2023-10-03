import React, { useState } from "react";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { loading } from "../../assets";

export default function AppHome() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/sign-up");
    }, 2000);
  };

  return isLoading ? (
    <div className="bg-[#1c273a] h-screen flex justify-center items-center">
      <div className="w-[300px] bg-[rgb(28, 39, 58)] p-10 rounded-lg">
        <img src={loading} />
      </div>
    </div>
  ) : (
    <div className="bg-[#1c273a] h-screen flex justify-center items-center">
      <div className="w-[300px] bg-[rgb(28, 39, 58)] p-10 rounded-lg">
        <Button
          onClick={handleSignUpClick}
          disabled={isLoading}
          label="go for Sign-up"
        />
      </div>
    </div>
  );
}
