const JournalCard = () => {
  return (
    <div className="flex w-full items-center px-4 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">

      <div className="w-12 shrink-0 text-center">
        <p className="text-[10px] font-semibold">SAT</p>
        <h4 className="text-xl font-bold">30</h4>
      </div>

      <div className="flex-1 min-w-0 pl-3">
        <h3 className="text-sm font-semibold text-gray-700 truncate">
          Your journal is empty. Start
        </h3>

        <p className="text-xs text-gray-500 line-clamp-2">
          Write your first entry and it will appear here. You can also
        </p>
      </div>

    </div>
  );
};

export default JournalCard;