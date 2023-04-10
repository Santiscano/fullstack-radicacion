import "./home.css";
import profile2 from "../../assets/images/LOGOTIPO_ENVIEXPRESS_horizontal_150x50.png";
import { useContext } from "react";
import { GeneralValuesContext } from "./../../Context/GeneralValuesContext";

function Home() {
  const { user } = useContext(GeneralValuesContext);
  // @ts-ignore
  const { users_name, users_lastname, sedes_name, roles } = user;

  return (
    <main className=" layout home">
      <section className="layout-section">
        <div className="layout-left">
          <article className="filing-home">
            <div className="flex flex-col items-center -mt-20">
              <img
                src={profile2}
                className="w-80 border-4 border-white mt-16"
              />
              <div className="flex flex-col items-center space-x-2 mt-2">
                <h2 className="text-3xl">Bienvenid@</h2>
                <p className="text-2xl">
                  {users_name} {users_lastname}
                </p>
                <span className="bg-blue-500 rounded-full p-1" title="Verified">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-100 h-2.5 w-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
              </div>
              <p className="text-gray-700">{roles}</p>
              <p className="text-sm text-gray-500">{sedes_name}, Colombia</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Home;
