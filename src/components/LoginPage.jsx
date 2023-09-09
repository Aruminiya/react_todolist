import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import WebTemplate from "../components/WebTemplate";

function LoginPage({ host, handleTokenChange, nickname, setNickname }) {
  //登入處理

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginResult, setLoginResult] = useState(); //儲存登入結果

  function handleLogin(e) {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  }

  const navigate = useNavigate();
  const login = async () => {
    try {
      const response = await axios.post(`${host}/users/sign_in`, loginForm);
      // console.log(response);
      console.log("登入成功");
      console.log(response);
      if (response.status === 200) {
        navigate("/todolist");
      }
      setLoginResult("登入成功 您的Token是 : " + response.data.token);
      setNickname(response.data.nickname);
      console.log(nickname);
      handleTokenChange(response.data.token);
    } catch (error) {
      alert("登入失敗");
      console.log("登入失敗");
      console.log(error);
      setLoginResult("登入失敗 : " + error.response.data.message);
    }
  };

  const loginPageElement = () => {
    return (
      <>
        <section className="d-flex flex-column justify-content-center col-12 col-md-6 ">
          <div className="d-flex flex-column h-100 m-3 ">
            <h1 className="text-center d-none d-md-block custom-font-weight">
              會員登入
            </h1>

            {/* 将 "col-12" 类应用于大屏幕上的文字部分 */}
            <h3 className="text-center display-6 d-md-none custom-font-weight px-5">
              會員登入
            </h3>
            {/* 将 "col-12" 类应用于小屏幕上的文字部分 */}

            <br className="d-none d-md-block" />

            <input
              className="w-100 custom-input"
              type="email"
              name="email"
              placeholder="請輸入Email"
              required="required"
              onChange={handleLogin}
            />
            <br />

            <input
              className="w-100 custom-input"
              type="password"
              name="password"
              placeholder="請輸入密碼"
              required="required"
              onChange={handleLogin}
            />
            <br />
            <div className="d-flex flex-column d-none d-md-block">
              <NavLink className="w-100">
                <button
                  className="col-5 custom-btn custom-btn-yellow my-3"
                  onClick={login}
                >
                  會員登入
                </button>
              </NavLink>

              <NavLink to="/" className="w-100">
                <button className="col-5 custom-btn custom-btn-black">
                  回到首頁
                </button>
              </NavLink>
            </div>
            <div className="d-flex flex-column align-items-center d-block d-md-none my-3">
              <NavLink className="w-100">
                <button
                  className="col-5 custom-btn w-100 custom-btn-yellow"
                  onClick={login}
                >
                  會員登入
                </button>
              </NavLink>

              <NavLink className="w-100" to="/">
                <button className="col-5 custom-btn w-100 custom-btn-black">
                  回到首頁
                </button>
              </NavLink>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <WebTemplate element={loginPageElement()} />
    </>
  );
}

export default LoginPage;
