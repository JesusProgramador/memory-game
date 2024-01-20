const Card = ({ userName, textHelper, icon }) => {
  return (
    <>
      {/* Card */}
      <div className="p-4 md:p-5 bg-slate-900 rounded-lg">
        <div className="flex">
          <div className="mt-1 flex-shrink-0 w-5 h-5 text-gray-800 dark:text-gray-200">
            {icon}
          </div>

          <div className="grow ms-5">
            <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
              {userName.toUpperCase()}
            </h3>
            <p className="text-sm text-gray-500">{textHelper}</p>
          </div>
        </div>
      </div>
      {/* End Card  */}
    </>
  );
};

export default Card;
