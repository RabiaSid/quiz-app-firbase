import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fbAuth } from "../../config/firebase/firebasemethods";
import { loading } from "../../assets";

export default function Protected(props: any) {
  const { Screen } = props;
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  let checkAuth = () => {
    setLoader(true);
    fbAuth()
      .then((res) => {
        // setTimeout(() => {
        setLoader(false);
        // }, 2000);
      })
      .catch((err) => {
        setLoader(false);
        navigate("/sign-in");
      });
  };
  return loader ? (
    <div className="bg-[#1c273a] h-screen flex justify-center items-center">
      <div className="w-[300px] bg-[rgb(28, 39, 58)] p-10 rounded-lg">
        <img src={loading} />
      </div>
    </div>
  ) : (
    <Screen />
  );
}
