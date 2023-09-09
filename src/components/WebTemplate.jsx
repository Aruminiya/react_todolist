import Woman from "../../public/Woman.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function WebTemplate({ element }) {
  return (
    <>
      <div className="bar"></div>

      <main className="container centered-content">
        <section className="col-md-6 d-none d-md-block">
          <img src={Woman} alt="Woman" className="img-fluid" />
        </section>
        {element}
      </main>
    </>
  );
}

export default WebTemplate;
