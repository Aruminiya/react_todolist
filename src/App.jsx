import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import TodolistPage from "./components/TodolistPage";
import ErrorPage from "./components/ErrorPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const host = "https://todolist-api.hexschool.io";

  const [nickname, setNickname] = useState(""); // 登入成功後 暱稱回傳

  const [token, setToken] = useState(null);

  const handleTokenChange = (newToken) => {
    setToken(newToken);
  };
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <LoginPage
                host={host}
                nickname={nickname}
                setNickname={setNickname}
                handleTokenChange={handleTokenChange}
              />
            }
          />
          <Route path="/signup" element={<SignUpPage host={host} />} />
          <Route
            path="/todolist"
            element={
              <TodolistPage
                host={host}
                token={token}
                nickname={nickname}
                setNickname={setNickname}
              />
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
