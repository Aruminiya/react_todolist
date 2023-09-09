import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import WebTemplate from "../components/WebTemplate";

function ErrorPage() {
  const ErrorPageelement = () => {
    return (
      <>
        <section className="col-12 col-md-6 d-flex flex-column justify-content-center p-4 ">
          <div className="d-flex flex-column text-right">
            <h1 className="d-none d-md-block custom-font-weight">迷路了嗎？</h1>
            <h2 className="h4 d-none d-md-block custom-font-weight">
              找不到此網頁
            </h2>
          </div>
          <div className="col-md-6 w-100 ">
            {/* 将 "col-12" 类应用于大屏幕上的文字部分 */}
            <h1 className="text-center display-2  d-md-none custom-font-weight ">
              迷路了嗎？
            </h1>
            {/* 将 "col-12" 类应用于小屏幕上的文字部分 */}
            <h2 className="text-center d-md-none custom-font-weight">
              找不到此網頁
            </h2>
            <br className="d-none d-md-block" />
            <br />
            <div className="d-none d-md-block">
              <NavLink to="/">
                <button className="col-5 custom-btn custom-btn-black">
                  回到首頁
                </button>
              </NavLink>
            </div>
            <div className="d-flex flex-column align-items-center d-block d-md-none ">
              <NavLink className="w-100 px-3" to="/signup">
                <button className="col-5 custom-btn custom-btn-black w-100">
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
      <WebTemplate element={ErrorPageelement()} />
    </>
  );
}

export default ErrorPage;
