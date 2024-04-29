import {createContext ,useState} from "react";
const TaskContext=createContext()

function TaskState({children}) {
    const [Task,setTask]=useState(null)
    const [AllTask,setAllTask]=useState(null)
    return(
        <TaskContext.Provider value={{Task,setTask,AllTask,setAllTask}}>
            {children}
        </TaskContext.Provider>
    )
}

export {TaskContext,TaskState}