import { useEffect, useState, useRef } from "react";
import { FaCheck, FaUser, FaXmark } from "react-icons/fa6";
import "./App.css";
import Card from "./components/Card";

const App = () => {
  const [userName, setUserName] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const [isFirstModalOpen, setFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setFirstModalOpen(true);
      setShowInput(false);
      setUserName(storedName?.trim());
    }
  }, []);

  const askForNewName = () => {
    setShowInput(true);
    setFirstModalOpen(false);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  const handleSaveName = () => {
    if (newUserName) {
      setSecondModalOpen(true);
    } else {
      localStorage.setItem("userName", userName?.trim());
      setFirstModalOpen(false);
      setShowInput(false);
    }
  };

  const confirmSave = () => {
    const newUser = localStorage.setItem("userName", newUserName?.trim());
    setUserName(newUser);
    setSecondModalOpen(false);
    setShowInput(false);
  };

  const cancelSave = () => {
    setNewUserName(userName?.trim());
    setSecondModalOpen(false);
    setShowInput(false);
  };
  return (
    <>
      <div className="bg-slate-800 w-100 min-h-screen p-4 text-white">
        <h1 className="text-3xl font-bold underline">Hola bienvenido</h1>
        <h2>Para comenzar primero debes de ingresar tu nombre de usuario</h2>

        {showInput ||
          (!userName && (
            <div className="flex flex-col">
              <div className="flex justify-center  rounded-lg shadow-sm">
                <input
                  ref={inputRef}
                  type="text"
                  id="hs-trailing-button-add-on-multiple-add-ons"
                  name="hs-trailing-button-add-on-multiple-add-ons"
                  className="py-3 px-4 block w-1/2 border-gray-200 shadow-sm rounded-s-md text-sm focus:border-blue-500 focus:z-10 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Tu nombre"
                />

                <button
                  type="button"
                  className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  onClick={handleSaveName}
                >
                  Guardar
                </button>
              </div>
            </div>
          ))}

        {/* First Modal */}
        {isFirstModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-xl text-gray-700 font-bold mb-4">{`Bienvenido ${userName.toUpperCase()}.`}</h2>
              <p className="text-gray-700 mb-4">¿Qué deseas hacer hoy?</p>
              <div className="flex justify-center">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2"
                  onClick={() => {
                    setFirstModalOpen(false);
                    setShowInput(false);
                  }}
                >
                  Continuar sesión
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                  onClick={askForNewName}
                >
                  Iniciar con otro nombre
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Second Modal */}
        {isSecondModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-xl text-gray-700 font-bold mb-4">
                Confirmación
              </h2>
              <p className="text-gray-700 mb-4">{`Esta seguro de continuar?`}</p>
              <div className="flex justify-center">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2"
                  onClick={confirmSave}
                >
                  Sí, continuar
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                  onClick={cancelSave}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {userName && (
          <div className="max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              <Card
                userName={userName}
                textHelper={"Sesión como invitado"}
                icon={<FaUser />}
              />

              <Card
                userName={"aciertos"}
                textHelper={"Conteo de aciertos"}
                icon={<FaCheck />}
              />

              <Card
                userName={"errores"}
                textHelper={"Conteo de errores"}
                icon={<FaXmark />}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
