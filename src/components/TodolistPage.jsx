import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function TodolistPage({ host, token, nickname, setNickname }) {
  //登出處裡

  const [logOutToken, setLogOutToken] = useState(); //儲存輸入的token
  const [logOutResult, setLogOutResult] = useState(); //儲存登出結果

  function handlogOut(e) {
    const { value } = e.target;
    setLogOutToken(value);
  }
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      const response = await axios.post(
        `${host}/users/sign_out`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("登出成功");
      console.log(response);
      setLogOutResult("登出成功");
      if (response.status === 200) {
        alert("登出成功");
        navigate("/");
      }
    } catch (error) {
      console.log("登出失敗");
      console.log(error);
      setLogOutResult("登出失敗 : " + error.response.data.message);
      alert("登出失敗");
    }
  };

  //我是分隔線
  const [filter, setFilter] = useState("all"); // 用於過濾代辦事項的狀態

  const [todos, setTodos] = useState([]); //原始資料取得
  const [newTodo, setNewTodo] = useState(""); //使用 newTodo 的值來建立新代辦事項
  const [todoEdit, setTodoEdit] = useState("");
  //登入後 取得目前的代辦資料
  useEffect(() => {
    console.log(todos);
  });
  useEffect(() => {
    getTodos();
  }, [token]);

  const getTodos = async () => {
    try {
      const response = await axios.get(`${host}/todos`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("資料取得囉！");
      // 將取得的資料複製並加入 editMode = false
      const updatedTodos = response.data.data.map((todo) => ({
        ...todo,
        editMode: false,
      }));

      setTodos(updatedTodos);
    } catch (e) {
      console.log("資料取得出錯囉！");
      console.log(e);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post(
        `${host}/todos`,
        { content: newTodo }, // 使用 newTodo 的值來建立新代辦事項
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("取得Todot成功了");
      console.log(response);

      setNewTodo(""); // 清空新代辦事項輸入欄
      getTodos();
      // 這裡可以考慮將新建立的代辦事項加入到 todo 陣列中，以避免再次抓取資料
    } catch (e) {
      console.log("添加新Todo失敗了");
      console.log(e);
      // 在這裡處理錯誤，例如顯示錯誤消息給用戶
    }
  };

  // 刪除資料

  const deleteTodo = async (id) => {
    await axios.delete(`${host}/todos/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    getTodos();
  };

  //編輯資料

  const updateTodo = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    todo.content = todoEdit[id];

    try {
      const response = await axios.put(`${host}/todos/${id}`, todo, {
        headers: {
          Authorization: token,
        },
      });

      console.log("更新Todo成功了");
      console.log(response);
      getTodos(); // 重新獲取代辦事項列表以更新狀態
    } catch (e) {
      console.log("更新Todo失敗了");
      console.log(e);
    }
  };

  // 變更狀態
  const toggleStatus = async (id) => {
    await axios.patch(
      `${host}/todos/${id}/toggle`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    getTodos();
  };

  //過濾代辦事項
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true; // 顯示所有代辦事項
    } else if (filter === "completed") {
      return todo.status === true; // 顯示已完成的代辦事項
    } else {
      return todo.status === false; // 顯示未完成的代辦事項
    }
  });

  return (
    <>
      <div className="bar"></div>
      <button
        className="custom-btn custom-btn-black custom-btn-logOut "
        type="button"
        onClick={logOut}
      >
        登出
      </button>
      <h3 className="nickname ">{nickname} 你好!</h3>
      <main className="container centered-content ">
        <section className="w-100 ">
          <div className="d-flex flex-row position-relative">
            <input
              type="text"
              name="list"
              className="w-100 custom-input m-0"
              placeholder="請輸入待辦事項"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              style={{
                borderRadius: "1rem 0 0 1rem",
                border: "3px solid #1a1a1a",
                borderRight: "none",
              }}
            />
            <button
              className="custom-btn  m-0 px-3 custom-btn-add "
              type="button"
              onClick={addTodo}
              style={{
                borderRadius: " 0 1rem 1rem 0",
                boxShadow: "0.35rem 0.35rem  #fece2f",
                border: "3px solid #1a1a1a",
                borderLeft: "none",
              }}
            >
              +
            </button>
          </div>
          <div className="position-relative panel  ">
            <div className="d-flex justify-content-around">
              <button
                className={`custom-btn-done ${
                  filter === "all" ? "active" : ""
                }`}
                onClick={() => setFilter("all")}
              >
                全部
              </button>
              <button
                className={`custom-btn-done ${
                  filter === "completed" ? "active" : ""
                }`}
                onClick={() => setFilter("completed")}
              >
                已完成
              </button>
              <button
                className={`custom-btn-done ${
                  filter === "uncompleted" ? "active" : ""
                }`}
                onClick={() => setFilter("uncompleted")}
              >
                未完成
              </button>
            </div>
            <hr className="gapLine" />
            <div className="listData m-4">
              {todos.length === 0 ? (
                <h1 className="h-100 text-center">目前尚無待辦事項</h1>
              ) : (
                <>
                  {filteredTodos.map((todo) => {
                    const editBtn = () => {
                      return (
                        <button
                          className="custom-btn custom-btn-yellow"
                          type="button"
                          onClick={() => handleEditClick(todo.id)}
                          style={{
                            borderRadius: "1rem",
                            width: "4rem",
                            height: "2rem",
                            fontSize: "1rem",
                            margin: "0rem",
                          }}
                        >
                          編輯
                        </button>
                      );
                    };

                    const handleEditClick = (id) => {
                      const updatedTodos = todos.map((todo) => {
                        if (todo.id === id) {
                          return { ...todo, editMode: true };
                        } else {
                          return todo;
                        }
                      });

                      setTodos(updatedTodos);
                    };

                    const handleUpdateClick = async (id) => {
                      // 更新相應代辦事項的 editMode 為 false
                      const updatedTodos = todos.map((todo) => {
                        if (todo.id === id) {
                          return { ...todo, editMode: false };
                        } else {
                          return todo;
                        }
                      });

                      setTodos(updatedTodos);

                      // 呼叫 updateTodo 函數，傳遞代辦事項的 ID
                      await updateTodo(id);
                    };

                    return (
                      <div key={todo.id}>
                        <input
                          className="check"
                          type="checkbox"
                          id={`vehicle${todo.id}`}
                          name={`vehicle${todo.id}`}
                          value={todo.content}
                          onChange={(e) => toggleStatus(todo.id, e)}
                          checked={
                            todo.status === true || todo.status === "completed"
                          }
                        />
                        <label
                          className="d-inline"
                          htmlFor={`vehicle${todo.id}`}
                        >
                          {todo.editMode ? (
                            <input
                              className=" custom-input-edit"
                              type="text"
                              value={todoEdit[todo.id]}
                              onChange={(e) => {
                                const newTodoEdit = {
                                  ...todoEdit,
                                };
                                newTodoEdit[todo.id] = e.target.value;
                                setTodoEdit(newTodoEdit);
                              }}
                              style={{
                                width: "100px", // 在這裡設定寬度
                                // 其他樣式設定...
                              }}
                            />
                          ) : (
                            todo.content
                          )}
                        </label>

                        {todo.editMode ? (
                          <button
                            className="custom-btn custom-btn-yellow"
                            type="button"
                            onClick={() => handleUpdateClick(todo.id)}
                            style={{
                              borderRadius: "1rem",
                              width: "4rem",
                              height: "2rem",
                              fontSize: "1rem",
                              margin: "0rem",
                            }}
                          >
                            完成
                          </button>
                        ) : (
                          editBtn()
                        )}

                        <button
                          className="custom-btn custom-btn-black "
                          type="button"
                          onClick={() => deleteTodo(todo.id)}
                          style={{
                            borderRadius: "1rem",
                            width: "4rem",
                            height: "2rem",
                            fontSize: "1rem",
                            margin: "0.3rem",
                          }}
                        >
                          刪除
                        </button>
                        <hr />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default TodolistPage;
