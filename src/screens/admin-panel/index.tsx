import React, { useEffect, useState } from "react";
import { fbAdd, fbGet, fblogout } from "../../config/firebase/firebasemethods";
import InputField from "../../components/inputfield";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { profile } from "../../assets";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [optionList, setoptionList] = useState<any>([]);
  const [correctOption, setCorrectOption] = useState<any>();
  const [option, setoption] = useState<any>("");
  const [questionModel, setQuestionModel] = useState<any>({});
  const [questions, setQuestions] = useState<any>([]);
  const [quizModel, setquizModel] = useState<any>({
    quizName: "",
    quizDurationInmin: "",
    secretKey: "",
    quizOpen: "",
    description: "",
    questions: [],
  });

  const fillQuizModel = (key: string, val: any) => {
    quizModel[key] = val;
    setquizModel({ ...quizModel });
  };
  const fillQuestionModel = (key: string, val: any) => {
    questionModel[key] = val;
    setQuestionModel({ ...questionModel });
  };

  const addOption = () => {
    optionList.push(option);
    setoptionList([...optionList]);
    setoption("")
  };
  const logOut = () => {
    fblogout().then(() => {
      navigate("/sign-in")
    })
  };

  const AddQuiz = () => {
    quizModel.questions = [...questions]
    console.log(quizModel)
    setDisable(false)
    fbAdd("quiz", quizModel)
      .then((res: any) => {
        console.log(res);
        setquizModel({
          ...quizModel,
          quizName: "",
          quizDurationInmin: "",
          secretKey: "",
          quizOpen: "",
          description: "",
          questions: [],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addQuestion = () => {
    questionModel.option = [...optionList];
    questionModel.correctOption = correctOption;
    console.log(questionModel);
    questions.push(questionModel);
    setQuestions([...questions]);
    setQuestionModel({});
    setCorrectOption("");
    setoptionList([]);
    setoption("")
  };

  return (
    <>
      <div className="grid grid-cols-4 h-screen">
        <div className="p-10 bg-[#525659]">
          <div className="flex justify-center"><img src={profile} width="150vw" /></div>
          <div className="py-2">
              <InputField
              disabled={true}
              label="HTML"
              />
            </div>
            <div className="py-2">
              <InputField
              disabled={true}
              label="CSS"
              />
            </div>
            <div className="py-2">
              <InputField
              disabled={true}
              label="JS Quiz 1"
              />
            </div>
            <div className="py-2">
              <InputField
              disabled={true}
              label="JS Quiz 2"
              />
            </div>
          <div><Button onClick={logOut}  label="logout" /></div>
        </div>
        <div className="p-10 col-span-3">
          <div className="grid grid-cols-4 ">
            <div className="col-span-3 pe-2">
              <h1 className="text-3xl font-medium">Quiz App Admin</h1>
            </div>
            <Button onClick={AddQuiz} label="Save" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="py-2">
              <InputField
                value={quizModel.quizName || ""}
                onChange={(e: any) => fillQuizModel("quizName", e.target.value)}
                disabled={disable}
                label="Quiz Name"
              />
            </div>
            <div className="py-2">
              <InputField
                value={quizModel.quizDurationInmin || ""}
                onChange={(e: any) =>
                  fillQuizModel("quizDurationInmin", e.target.value)
                }
                label="Quiz Duration In min"
                disabled={disable}
              />
            </div>
            <div className="py-2">
              <InputField
                value={quizModel.secretKey || ""}
                onChange={(e: any) =>
                  fillQuizModel("secretKey", e.target.value)
                }
                label="Secret Key"
                disabled={disable}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="py-2">
              <InputField
                value={quizModel.quizOpen || ""}
                onChange={(e: any) => fillQuizModel("quizOpen", e.target.value)}
                label="Quiz Open"
                disabled={disable}
              />
            </div>
            <div className="py-2">
              <InputField
                value={quizModel.description || ""}
                onChange={(e: any) =>
                  fillQuizModel("description", e.target.value)
                }
                label="Description"
                disabled={disable}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="py-2">
              <Button onClick={() => setDisable(true)} label="Lock Quiz" />
            </div>
          </div>
          <div className="py-2">
            <div>
              <div className="py-2">
                <InputField
                  value={questionModel.question || ""}
                  onChange={(e: any) =>
                    fillQuestionModel("question", e.target.value)
                  }
                  label="Question"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 ">
            <div className="col-span-3 pe-2">
              <InputField
                value={option}
                onChange={(e) => {
                  setoption(e.target.value);
                }}
                label="Option"
              />
            </div>
            <Button label="Add More Option" onClick={addOption} />
          </div>

          <div className="grid grid-cols-4 py-2">
            <div className="col-span-3 pe-2">
              {optionList.map((x: any, i: any) => (
                <Button
                  key={i}
                  label={x}
                  onClick={() => {
                    setCorrectOption(x);
                  }}
                />
              ))}
            </div>
            {correctOption && <Button label={correctOption} />}
          </div>
          <div className="grid grid-cols-4 ">
            <Button label="Save Question" onClick={addQuestion} />
          </div>
        </div>
      </div>
    </>
  );
}
