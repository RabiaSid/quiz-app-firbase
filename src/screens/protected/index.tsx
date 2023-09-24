import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fbAuth } from "../../config/firebase/firebasemethods";

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
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        navigate("/sign-in");
      });
  };
  return loader ? (
    <>
      <h1>loading</h1>
    </>
  ) : (
    <Screen />
  );
}
