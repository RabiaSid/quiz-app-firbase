import React, { useEffect, useState } from "react";
import { fbAdd, fbGet } from "../../config/firebase/firebasemethods";
import InputField from "../../components/inputfield";
import Button from "../../components/button";

export default function AdminPanel() {
  const [disable, setDisable] = useState(false);
  const [text, setText] = useState("");
  const [list, setList] = useState<any>([]);
  const [model, setModel] = useState<any>({
    quizName: "",
    quizDurationInmin: "",
    secretKey: "",
    quizOpen: "",
    description: "",
    questions: [
      {
        question: "",
        options: {
          option1: "",
          option2: "",
        },
        correctOption: "",
      },
    ],
  });

  const fillModel = (key: string, val: any) => {
    model[key] = val;
    setModel({ ...model });
  };

  let addItem = () => {
    if (text.trim() !== "") {
      setList([...list, { text }]);
      setText("");
    } else {
      alert("Please enter a non-empty todo x.");
    }
  };

  const AddTask = () => {
    fbAdd("tasks", model)
      .then((res: any) => {
        console.log(res);
        setModel({
          ...model,
          quizName: "",
          quizDurationInmin: "",
          secretKey: "",
          quizOpen: "",
          description: "",
          questions: [
            {
              question: "",
              options: {
                option1: "",
                option2: "",
              },
              correctOption: "",
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="grid grid-cols-4 h-screen">
        <div className="p-10 bg-[#525659]">
          <div></div>
        </div>
        <div className="p-10 col-span-3">
          <div className="grid grid-cols-4 ">
            <div className="col-span-3 pe-2">
              <h1 className="text-3xl font-medium">Quiz App Admin</h1>
            </div>
            <Button onClick={AddTask} label="Save" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="py-2">
              <InputField
                value={model.quizName}
                onChange={(e: any) => fillModel("quizName", e.target.value)}
                disabled={disable}
                label="Quiz Name"
              />
            </div>
            <div className="py-2">
              <InputField
                value={model.quizDurationInmin}
                onChange={(e: any) =>
                  fillModel("quizDurationInmin", e.target.value)
                }
                label="Quiz Duration In min"
                disabled={disable}
              />
            </div>
            <div className="py-2">
              <InputField
                value={model.secretKey}
                onChange={(e: any) => fillModel("secretKey", e.target.value)}
                label="Secret Key"
                disabled={disable}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="py-2">
              <InputField
                value={model.quizOpen}
                onChange={(e: any) => fillModel("quizOpen", e.target.value)}
                label="Quiz Open"
                disabled={disable}
              />
            </div>
            <div className="py-2">
              <InputField
                value={model.description}
                onChange={(e: any) => fillModel("description", e.target.value)}
                label="Description"
                disabled={disable}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="py-2">
              <Button
                // onClick={AddTask}
                onClick={() => setDisable(true)}
                label="Lock Quiz"
              />
            </div>
          </div>
          <div className="py-2">
            <div>
              <div className="py-2">
                <InputField
                  value={model.question}
                  onChange={(e: any) => fillModel("question", e.target.value)}
                  label="Question"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 ">
            <div className="col-span-3 pe-2">
              <InputField
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                label="Option"
              />
            </div>
            <Button label="Add More Option" onClick={addItem} />
          </div>

          <div className="grid grid-cols-4 py-2">
            <div className="col-span-3 pe-2">
              <div className="py-2">
                <InputField
                  value={model.option1}
                  onChange={(e: any) => fillModel("option1", e.target.value)}
                  label="option 1"
                />
              </div>
              <div className="py-2">
                <InputField
                  value={model.option2}
                  onChange={(e: any) => fillModel("option2", e.target.value)}
                  label="option 2"
                />
                {list.map((x: any, i: any) => (
                   <InputField
                    key={i}
                    type="text"
                    value={x.text}
                    label={"option" + i + 3}
                    // className="edit_input w-100"
                    onChange={(e: any) => fillModel( i, e.target.value)}
                  />
                ))}
              </div>
            </div>
            <InputField
              value={model.correctOption}
              onChange={(e: any) => fillModel("correctOption", e.target.value)}
              label="correct : option "
            />
          </div>
          <div className="grid grid-cols-4 ">
            <Button label="Save Question" />
          </div>
        </div>
      </div>
    </>
  );
}
