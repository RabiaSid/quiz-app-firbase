import React, { useEffect, useState } from "react";
import { fbGet } from "../../config/firebase/firebasemethods";
import InputField from "../../components/inputfield";
import Button from "../../components/button";

export default function UserQuiz() {
  const [taskList, setTaskList] = useState<any>();
  const [isTrue, setIsTrue] = useState(true);
  const [model, setModel] = useState<any>({ secretInput: "" });

  const fillModel = (key: string, val: any) => {
    model[key] = val;
    setModel({ ...model });
  };

  const GetTask = () => {
    fbGet("tasks")
      .then((res: any) => {
        console.log(res);
        setTaskList([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetTask();
  }, []);

  return (
    <>
      {taskList && taskList.length > 0
        ? taskList.map((x: any) => (
            <div>
              {isTrue ? (
                <>
                  <div className="bg-primary h-screen flex justify-center items-center">
                    <div className="w-[500px] bg-[rgba(255,255,255,.2)] p-10 rounded-lg">
                      <InputField
                        value={model.secretInput}
                        onChange={(e: any) =>
                          fillModel("secretInput", e.target.value)
                        }
                        label="secretInput"
                      />
                      <Button
                        label="check"
                        onClick={() =>
                          setIsTrue(
                            model.secretInput === x.secretKey ? false : true
                          )
                        }
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-primary h-screen  m-0 p-0 grid grid-cols-1 md:grid-cols-2">
                  <div className="flex justify-center items-center bg-purple-900">
                    <div key={x.id} className=" my-2 px-5 py-2">
                      <div className="grid grid-cols-1">
                        <h1
                          className="text-5xl py-2 text-white"
                          style={{ fontWeight: "bold" }}
                        >
                          Subject: {x.quizName}
                        </h1>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <h3
                          className="text-3xl py-2 text-white"
                          style={{ fontWeight: "bold" }}
                        >
                          Time: {x.quizDurationInmin}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <h3 className="text-3xl py-2 text-white">
                          Active: {x.quizOpen}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1">
                        <h3 className="text-3xl py-2 text-white">
                          Description: {x.description}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center ">
                    <div className="grid grid-cols-1 bg-[#0d103f] py-3 px-5 rounded">
                      <div className="grid grid-cols-1">
                        <h3
                          className="text-3xl py-2 text-white"
                          style={{ fontWeight: "bold" }}
                        >
                          {x.question}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1">
                        <h3 className="text-2xl py-2 text-white">
                          {x.option1}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1">
                        <h3 className="text-2xl py-2 text-white">
                          {x.option2}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        : null}
    </>
  );
}
