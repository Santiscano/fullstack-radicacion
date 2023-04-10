import logoEnviexpress from "../../assets/images/LOGOTIPO_ENVIEXPRESS_horizontal_150x50.png";
import { useNavigate } from "react-router-dom";
import "./error.css";

interface error {
  title: string;
  image: string;
  message1: string;
  message2?: string;
}

function Error({ title, image, message1, message2 }: error) {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/dashboard/home");
  };
  return (
    <>
      <div className="min-w-screen min-h-screen bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative">
        <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
          <div className="w-full md:w-1/2">
            <div className="mb-10 lg:mb-20">
              <img src={logoEnviexpress} alt="enviexpress logo" width="300px" />
            </div>
            <div className="mb-10 md:mb-20 text-gray-600 font-light">
              <h1 className="font-black uppercase text-3xl lg:text-5xl mb-10 text--color">
                {title}
              </h1>
              <p>{message1}</p>
              <p>{message2}</p>
            </div>
            <div className="mb-20 md:mb-0">
              <button
                onClick={navigateHome}
                className="text-lg font-light outline-none focus:outline-none transform transition-all hover:scale-110 text--color"
              >
                <i className="mdi mdi-arrow-left mr-2"></i>Regresar a home
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center">
            <img src={image} alt="not found" />
          </div>
        </div>
        <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
        <div className="w-96 h-full bg-yellow-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
      </div>
    </>
  );
}

export default Error;
