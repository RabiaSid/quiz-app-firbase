import { useState } from "react";
import Button from "../../components/button";
import { fbSignUp } from "../../config/firebase/firebasemethods";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/inputfield";

export default function Signup() {
  const [model, setModel] = useState<any>({
    userName: "",
    fullname:"",
    email: "",
    password: "",
    role:""
  });

  const fillModel = (key: string, val: any) => {
    model[key] = val;
    setModel({ ...model });
  };

  const navigate = useNavigate();

  let signUpUser = () => {
    console.log(model);
    fbSignUp(model)
      .then((res :any) => {
        if(res.role == "admin"){
          navigate("/admin-panel")
        }else{
          navigate("/user-quiz")
        }
        // navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="bg-indigo h-screen flex justify-center items-center">
        <div className="w-[500px] bg-indigo-500/[.03]  p-10 rounded-lg ">
          <div className="py-3">
            <h1 className="text-3xl font-medium">Sign Up</h1>
          </div>
          <div className="py-3">
            <InputField
              value={model.userName}
              onChange={(e: any) => fillModel("userName", e.target.value)}
              label="User Name"
            />
          </div>
          <div className="py-3">
            <InputField
              value={model.fullname}
              onChange={(e: any) => fillModel("fullname", e.target.value)}
              label="Full Name"
            />
          </div>
          <div className="py-3">
            <InputField
              value={model.email}
              onChange={(e: any) => fillModel("email", e.target.value)}
              label="Email"
            />
          </div>
          <div className="py-3">
            <InputField
              value={model.password}
              onChange={(e: any) => fillModel("password", e.target.value)}
              label="Password"
            />
          </div>
          {/* <div className="py-3">
            <InputField
              value={model.role}
              onChange={(e: any) => fillModel("role", e.target.value)}
              label="Role"
            />
          </div> */}
          <div className="py-3">
            <Button onClick={signUpUser} label="Sign Up" />
          </div>
          <div className="py-3">
            <p className="text-white">
              If you have allready login?
              <Link to="/sign-in"> Log in </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}