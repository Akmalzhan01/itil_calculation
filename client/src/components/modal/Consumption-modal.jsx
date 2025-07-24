/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import moment from "moment";
import { ConsumptionApi } from "../../utils/apis";

function ConsumptionModal({ setIsModalOpen }) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [datew, setDatew] = useState("");
  const [error, setError] = useState("");

  function formatDate(inputDate) {
    if (!inputDate) return null;
    
    // type="date" inputi 'YYYY-MM-DD' formatida qiymat qaytaradi
    const date = moment(inputDate, 'YYYY-MM-DD');
    if (date.isValid()) {
      return date.format('YYYY.MM.DD');
    }
    return null;
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    
    const formattedDate = formatDate(datew);
    if (!formattedDate) {
      setError("Iltimos, to'g'ri sana kiriting");
      return;
    }

    try {
      await ConsumptionApi.addConsumption({
        description,
        value: Number(value),
        date: formattedDate
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      setError("Ma'lumotlarni saqlashda xatolik yuz berdi");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center p-4 bg-black/90 text-white">
      <div className="w-full flex justify-end">
        <IoClose 
          onClick={() => setIsModalOpen(false)} 
          className="w-7 h-7 cursor-pointer" 
        />
      </div>
      <form 
        onSubmit={handleAdd}
        className="mt-24 py-6 border border-white rounded-xl w-10/12 flex flex-col items-center"
      >
        <h2 className="font-bold text-xl">Добавить расход</h2>
        <div className="w-full border mt-5"></div>
        <div className="w-full flex flex-col justify-center items-center">
          <label className="mt-6 w-10/12 flex flex-col">
            Название:
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="border border-white rounded bg-transparent text-white w-full h-8 px-2"
              required
            />
          </label>
          <label className="mt-6 w-10/12 flex flex-col">
            Сумма:
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="number"
              className="border border-white rounded bg-transparent text-white w-full h-8 px-2"
              required
              min="0"
            />
          </label>
          <label className="mt-6 w-10/12 flex flex-col">
            Дата:
            <input
              value={datew}
              onChange={(e) => {
                setDatew(e.target.value);
                setError("");
              }}
              type="date"
              className="border border-white rounded bg-transparent text-white w-full h-8 px-2"
              required
            />
          </label>
          
          {error && <p className="text-red-500 mt-2">{error}</p>}
          
          <button
            type="submit"
            className="w-10/12 bg-white text-black rounded h-8 mt-6 hover:bg-gray-200 transition-colors"
          >
            Добавить
          </button>
        </div>
      </form>
    </div>
  );
}

export default ConsumptionModal;