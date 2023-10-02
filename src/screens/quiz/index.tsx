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
  const [answered, setAnswered] = useState<any>([]);
  const [count, setCount] = useState<any>(0);
  const [answerSelected, setAnswerSelected] = useState<any>(false);
  const [showSelected, setShowSelected] = useState<any>(false);
  const [showModal, setShowModal] = useState<any>(false);

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

  const setResult = () => {
    setAnswerSelected(false);
    setShowSelected(true);
  };

  const showResult = () => {
    setShowModal(!showModal);
    setShowSelected(true);
  };

  const totalMarks = (questionList.length / count) * 10;

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
                {answerSelected && (
                  <div className="grid grid-cols-3 mt-2">
                    <Button onClick={setResult} label="submit" />
                  </div>
                )}
                {showSelected && (
                  <div className="grid grid-cols-3 mt-2">
                    <Button onClick={showResult} label="Show Result" />
                  </div>
                )}
                {showModal ? (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                              Show Result
                            </h3>
                          </div>
                          <div className="relative p-6 flex-auto">
                            <h3 className="text-2xl my-4 text-slate-500 text-lg leading-relaxed px-8">
                              point = {count}
                            </h3>
                            <h3 className="text-2xl my-4 text-slate-500 text-lg leading-relaxed px-8">
                              Total marks = {totalMarks} / {count * 10}
                            </h3>
                          </div>
                          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={showResult}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
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
                                onClick={() => {
                                  // console.log(answered.length)
                                  if (question.correctOption !== option) {
                                    console.log("wrong answer");
                                  } else {
                                    if (!answered[i]) {
                                      setCount(count + 1);
                                      console.log(count);
                                      const confirmAnswer = [...answered];
                                      confirmAnswer[i] = true;
                                      setAnswered(confirmAnswer);
                                      // console.log(confirmAnswer.length)
                                      console.log("correct answer");
                                    }
                                    setAnswerSelected(true);
                                  }
                                }}
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
