import { useEffect, useState, useRef } from "react";
import CardBoard from "./screens/CardBoard";
import "./App.css";
import NewUser from "./screens/NewUser";

const App = () => {
  const [userName, setUserName] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [isFirstModalOpen, setFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setFirstModalOpen(true);
      setUserName(storedName?.trim());
    }
  }, []);

  const askForNewName = () => {
    setIsNewUser(true);
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
      setIsNewUser(false);
    }
  };

  const confirmSave = () => {
    const newUser = newUserName?.trim();
    localStorage.setItem("userName", newUser);
    setUserName(newUser);
    setSecondModalOpen(false);
    setIsNewUser(false);
  };

  const cancelSave = () => {
    setNewUserName(userName?.trim());
    setSecondModalOpen(false);
    setIsNewUser(false);
  };

  return (
    <>
      <div className="bg-slate-800 w-100 min-h-screen p-4 text-white">
        <h1 className="text-3xl font-bold underline">Hola bienvenido</h1>
        {!userName && (
          <>
            <h2>Para comenzar primero debes de ingresar tu nombre</h2>
            <NewUser
              inputRef={inputRef}
              setNewUserName={setNewUserName}
              handleSaveName={handleSaveName}
            />
          </>
        )}

        {userName && !isNewUser ? (
          <CardBoard userName={userName} />
        ) : (
          <NewUser
            inputRef={inputRef}
            setNewUserName={setNewUserName}
            handleSaveName={handleSaveName}
          />
        )}

        {/* Modal */}
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

        {/* Modal */}
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
      </div>
    </>
  );
};

export default App;
