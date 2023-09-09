import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import WebTemplate from "./WebTemplate";

function SignUpPage({ host }) {
  const [singUpform, setSingUpForm] = useState({
    email: "",
    password: "",
    nickname: "",
  });
  const [singUpResult, setSingUpResult] = useState(); //儲存註冊結果

  function handelSingUp(e) {
    const { name, value } = e.target;
    setSingUpForm({ ...singUpform, [name]: value }); //[name]是計算屬姓名
  }
  const navigate = useNavigate();
  const singUp = async () => {
    try {
      const response = await axios.post(`${host}/users/sign_up`, singUpform);
      console.log("註冊成功");
      console.log(response);

      if (response.status === 201) {
        alert("註冊成功");
        navigate("/login");
      }

      setSingUpResult("註冊成功");
    } catch (error) {
      alert("註冊失敗 " + error.response.data.message);
      console.log("註冊失敗 ");
      console.log(error);
      setSingUpResult("註冊失敗 : " + error.response.data.message);
    }
  };
  const signUpPageElement = () => {
    return (
      <>
        <section className="d-flex flex-column justify-content-center col-12 col-md-6 ">
          <div className="d-flex flex-column h-100 m-3 ">
            <h1 className="text-center d-none d-md-block custom-font-weight">
              會員註冊
            </h1>

            {/* 将 "col-12" 类应用于大屏幕上的文字部分 */}
            <h3 className="text-center display-6 d-md-none custom-font-weight px-5">
              會員註冊
            </h3>
            {/* 将 "col-12" 类应用于小屏幕上的文字部分 */}

            <br className="d-none d-md-block" />

            <input
              className="w-100 custom-input"
              type="email"
              name="email"
              placeholder="請輸入Email"
              required="required"
              onChange={handelSingUp}
            />
            <br />

            <input
              className="w-100 custom-input"
              type="password"
              name="password"
              placeholder="請輸入密碼"
              required="required"
              onChange={handelSingUp}
            />
            <br />
            <input
              className="w-100 custom-input"
              type="text"
              name="nickname"
              placeholder="請輸入暱稱"
              required="required"
              onChange={handelSingUp}
            />
            <br />
            <div className="d-flex flex-column d-none d-md-block">
              <NavLink className="w-100">
                <button
                  className="col-5 custom-btn custom-btn-yellow my-3"
                  onClick={singUp}
                >
                  會員註冊
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
                  onClick={singUp}
                >
                  會員註冊
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
      <WebTemplate element={signUpPageElement()} />
    </>
  );
}

export default SignUpPage;
