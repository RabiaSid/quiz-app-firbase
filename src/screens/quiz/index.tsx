import React, { useEffect, useState } from "react";
import { fbGet } from "../../config/firebase/firebasemethods";

export default function UserQuiz() {
  const [taskList, setTaskList] = useState<any>();

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
    <div className="bg-primary h-screen  m-0 p-0 grid grid-cols-1 md:grid-cols-2">
      <div className="flex justify-center items-center bg-purple-900">
      {taskList && taskList.length > 0 ? taskList.map((x: any)=>(
           <div key={x.id} className="rounded bg-white drop-shadow-xl my-2 px-5 py-2">
              <h1 className="text-3xl">{x.quizName}</h1>
              <p>{x.assignee}</p>
            </div>
          ))
          :
          null
        }
      </div>
      <div className="flex justify-center items-center ">
      {taskList && taskList.length > 0 ? taskList.map((x: any)=>(
           <div key={x.id} className="rounded bg-white drop-shadow-xl my-2 px-5 py-2 bg-blue-900/[0.3] px-10">
              <h1 className="text-3xl">{x.quizName}</h1>
              <p>{x.assignee}</p>
            </div>
          ))
          :
          null
        }
      </div>
      
    </div>
  )
}
