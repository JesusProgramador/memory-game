
const NewUser = ({ setNewUserName, handleSaveName, inputRef }) => {

  return (
    <div className="flex flex-col mt-6">
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
  );
};

export default NewUser;
