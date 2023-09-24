import React, { useEffect, useState } from "react";
import { fbAdd, fbGet } from "../../config/firebase/firebasemethods";
import InputField from "../../components/inputfield";
import Button from "../../components/button";

export default function AdminPanel() {
  const [disable, setDisable] = useState(false);
  // const [taskList, setTaskList] = useState<any>();
  const [model, setModel] = useState<any>({
    quizName:"",
    quizDurationInmin:"",
    secretKey:"",
    assignee:"",
    quizOpen:"",
    description:"",
    question:"",
    addMoreOption:"",
    option1:"",
    correctOption:"",
    option2:"",
  });

  const fillModel = (key: string, val: any) => {
    model[key] = val;
    setModel({ ...model });
  };

  const AddTask = () => {
    fbAdd("tasks", model)
      .then((res: any) => {
        console.log(res);
        setModel({});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const GetTask = () => {
  //   fbGet("tasks")
  //     .then((res: any) => {
  //       console.log(res);
  //       setTaskList([...res]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   GetTask();
  // }, []);

  return (
    <>
      
      <div className="grid grid-cols-4 h-screen">
        <div className="p-10">
          
        </div>
        <div className="p-10 col-span-3">
        <div className="grid grid-cols-4 ">
         <div className="col-span-3 pe-2">
          <h1 className="text-3xl font-medium">Quiz App Admin</h1>
          </div>
          <Button 
            onClick={AddTask} 
            label="Save" />
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
              onChange={(e: any) => fillModel("quizDurationInmin", e.target.value)}
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
            label="Lock Quiz" />
          </div>
          </div>
          <div className="py-2">
          <InputField
              value={model.question}
              onChange={(e: any) => fillModel("question", e.target.value)}
              label="Question"
            />
          </div>
          <div className="grid grid-cols-4 ">
          <div className="col-span-3 pe-2">
          <InputField
              value={model.addMoreOption}
              onChange={(e: any) => fillModel("addMoreOption", e.target.value)}
              label="Option"
            />
          </div>
          <Button 
            // onClick={AddTask} 
            label="Add Option" />
          </div>
          <div className="grid grid-cols-4  ">
         <div className="col-span-2 pe-2 py-2">
         <InputField
              value={model.option1}
              onChange={(e: any) => fillModel("option1", e.target.value)}
              label="Option 1"
            />
          </div>
          <div className="col-span-2 pe-2 py-2">
          <InputField
              value={model.correctOption}
              onChange={(e: any) => fillModel("correctOption", e.target.value)}
              label="correct : Option"
            />
            </div>
            <div className="col-span-2 pe-2 py-2">
          <InputField
              value={model.option2}
              onChange={(e: any) => fillModel("option2", e.target.value)}
              label="Option 2"
            />
            </div>
          </div>

          
          
          
        {/* {taskList && taskList.length > 0 ? taskList.map((x: any)=>(
           <div key={x.id} className="rounded bg-white drop-shadow-xl my-2 px-5 py-2">
              <h1 className="text-3xl">{x.task}</h1>
              <p>{x.assignee}</p>
            </div>
          ))
          :
          null
        } */}
        </div>
      </div>

    </>
  );
}
