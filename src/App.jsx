import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [addTask, setAddTask] = useState([]);
  const [renderTask, setRenderTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [saveEditedTask, setSaveEditedTask] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("todoTasks");
    if (storedTasks) {
      setAddTask(JSON.parse(storedTasks));
    }
  }, []);

  const handleAddTask = () => {
    const updatedTasks = [...addTask, renderTask];
    setAddTask(updatedTasks);
    setRenderTask("");
    localStorage.setItem("todoTasks", JSON.stringify(updatedTasks));
  };
  

  const removeTask = (ind) => {
    const updatedTasks = addTask.filter((_, indexx) => indexx !== ind);
    setAddTask(updatedTasks);
    localStorage.setItem("todoTasks", JSON.stringify(updatedTasks));
  };

  const editTask = (index) => {
    setEditIndex(index);
    setSaveEditedTask(addTask[index]);
  };

  const saveTask = () => {
    if (saveEditedTask !== "") {
      const updatedTasks = [...addTask];
      updatedTasks[editIndex] = saveEditedTask;
      setAddTask(updatedTasks);
      setEditIndex(null);
      setSaveEditedTask("");
      localStorage.setItem("todoTasks", JSON.stringify(updatedTasks));
    }
  };
  return (
    <>
      <div className="input-container w-[60%] mx-[auto] h-screen shadow-lg">
        <div className="head text-white text-center mt-[3rem] font-medium">TODAY'S TODO LIST</div>
        <div className="todocontainer mt-[3rem] border border-slate-400 p-3 rounded-lg flex justify-center items-center flex-col">
          <div className="input-container mb-[3rem] flex justify-center items-center">
            <input
              type="text"
              name="userinput"
              className="border rounded-sm mr-6 w-[23.1vw] h-[5vh] outline-none p-4"
              value={renderTask}
              onChange={(e) => setRenderTask(e.target.value)}
            />
            <button
              className="bg-emerald-500 text-white px-5 py-2 rounded-sm"
              onClick={handleAddTask}
            >
              ADD TODO
            </button>
          </div>

          <div className="todo-lists">
            <ul>
              {addTask.map((currentValue, index) => (
                <li key={index} className="mb-2">
                  {editIndex === index ? (
                    <>
                      <input
                        type="text"
                        name="editText"
                        value={saveEditedTask}
                        onChange={(e) => setSaveEditedTask(e.target.value)}
                        className="mx-4 rounded-sm bg-zinc-200 h-[5vh] p-4"
                      />
                      <button
                        className="bg-emerald-500 text-white px-5 py-2 rounded-sm"
                        onClick={saveTask}
                      >
                        SAVE
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="w-[16vw] border px-[10px] py-[8px] inline-block text-white bg-zinc-700 rounded-sm">
                        {currentValue}
                      </span>

                      <button
                        className="bg-sky-500 text-white px-[2rem] py-[.6rem] inline-block mx-3 rounded-sm"
                        onClick={() => editTask(index)}
                      >
                        EDIT
                      </button>
                      <button
                        className="bg-red-500 text-white px-[2rem] py-[.6rem] inline-block rounded-sm"
                        onClick={() => removeTask(index)}
                      >
                        REMOVE
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
