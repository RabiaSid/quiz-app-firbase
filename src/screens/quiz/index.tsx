import React, { useEffect, useState } from "react";
import { fbGet } from "../../config/firebase/firebasemethods";
import InputField from "../../components/inputfield";
import Button from "../../components/button";

export default function UserQuiz() {
  const [quizList, setQuizList] = useState<any>([]);
  const [questionList, setQuestionList] = useState<any>([]);
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [isTrue, setIsTrue] = useState(true);
  const [model, setModel] = useState<any>({ secretInput: "" });

  const fillModel = (key: string, val: any) => {
    model[key] = val;
    setModel({ ...model });
  };

  const GetTask = () => {
    fbGet("quiz")
      .then((res: any) => {
        console.log(res);
        setQuizList([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetTask();
  }, []);

  const handleSecretKeySubmit = (secretKey: string) => {
    const quizToShow = quizList.find(
      (quiz: any) => quiz.secretKey === secretKey
    );

    if (quizToShow) {
      setActiveQuiz(quizToShow);
      setQuestionList([...quizToShow.questions]);
      console.log([...quizToShow.questions]);
      setIsTrue(false);
    } else {
      setActiveQuiz(null);
    }
  };

  return (
    <>
      {isTrue ? (
        <div className="bg-primary h-screen flex justify-center items-center">
          <div className="w-[500px] bg-[rgba(255,255,255,.2)] p-10 rounded-lg">
            <InputField
              value={model.secretInput}
              onChange={(e: any) => fillModel("secretInput", e.target.value)}
              label="secretInput"
            />
            <Button
              label="check"
              onClick={() => {
                handleSecretKeySubmit(model.secretInput);
              }}
            />
          </div>
        </div>
      ) : (
        activeQuiz && (
          <div className="bg-primary h-screen m-0 p-0 grid grid-cols-1 md:grid-cols-2">
            <div className="flex justify-center items-center bg-purple-900">
              <div key={activeQuiz.id} className="my-2 px-5 py-2">
                <div className="grid grid-cols-1">
                  <h1
                    className="text-5xl py-2 text-white"
                    style={{ fontWeight: "bold" }}
                  >
                    Subject: {activeQuiz.quizName}
                  </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <h3
                    className="text-3xl py-2 text-white"
                    style={{ fontWeight: "bold" }}
                  >
                    Time: {activeQuiz.quizDurationInmin}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <h3 className="text-3xl py-2 text-white">
                    Active: {activeQuiz.quizOpen}
                  </h3>
                </div>
                <div className="grid grid-cols-1">
                  <h3 className="text-3xl py-2 text-white">
                    Description: {activeQuiz.description}
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex justify-center  grid grid-cols-1 py-5 px-5 ">
              {questionList && questionList.length > 0
                ? questionList.map((question: any, i: number) => (
                    <div
                      className="grid grid-cols-1 px-10 py-5 bg-[#0d103f] "
                      key={i}
                    >
                      <div className="grid grid-cols-1">
                        <h3
                          className="text-2xl text-white"
                          style={{ fontWeight: "bold" }}
                        >
                          {question.question}
                        </h3>
                      </div>
                      {question.option && question.option.length > 0
                        ? question.option.map((option: string, j: number) => (
                            <div className="grid grid-cols-1  m-0" key={j}>
                              <Button 
                              label={option}
                              />
                            </div>
                          ))
                        : null}
                    </div>
                  ))
                : null}
            </div>
          </div>
        )
      )}
    </>
  );
}
