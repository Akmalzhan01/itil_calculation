/* eslint-disable react/prop-types */
import moment from "moment";
import { useState } from "react";
import { ConsumptionApi } from "../../utils/apis";
import { IoClose } from "react-icons/io5";

export default function ConsumtionEdit({
  consumptionDetailed,
  setConsumptionDetailed,
  setIsEditConsumption,
}) {
  const [description, setDescription] = useState(
    consumptionDetailed?.description || ""
  );
  const [value, setValue] = useState(consumptionDetailed?.value || 0);
  const [datew, setDatew] = useState(
    consumptionDetailed?.date?.slice(0, 10) || ""
  );
  const [error, setError] = useState(null);

  function formatDate(inputDate) {
    if (!inputDate) return "";
    const date = moment(inputDate, "YYYY-MM-DD");
    return date.isValid() ? date.format("YYYY.MM.DD") : "";
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);

    const numValue = Number(value);
    if (isNaN(numValue) || numValue <= 0) {
      setError("Iltimos, to'g'ri summa kiriting");
      return;
    }

    const formattedDate = formatDate(datew);
    if (!formattedDate) {
      setError("Iltimos, to'g'ri sana kiriting");
      return;
    }

    try {
      const updatedData = {
        ...consumptionDetailed,
        description,
        value: numValue,
        date: formattedDate,
      };

      await ConsumptionApi.updateConsumptions(
        consumptionDetailed._id,
        updatedData
      );
      setConsumptionDetailed(updatedData);
      setIsEditConsumption(false);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      setError("Ma'lumotlarni yangilashda xatolik yuz berdi");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center p-4 bg-black/90 text-white">
      <div className="w-full flex justify-end">
        <IoClose
          onClick={() => setIsEditConsumption(false)}
          className="w-7 h-7 cursor-pointer"
        />
      </div>
      <form
        onSubmit={handleUpdate}
        className="mt-24 py-6 border border-white rounded-xl w-10/12 flex flex-col items-center"
      >
        <h2 className="font-bold text-xl">Редактировать расход</h2>
        <div className="w-full border mt-5"></div>
        {error && <div className="text-red-500 w-10/12 mb-4">{error}</div>}
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
              min="0.01"
              step="0.01"
            />
          </label>
          <label className="mt-6 w-10/12 flex flex-col">
            Дата:
            <input
              value={datew}
              onChange={(e) => setDatew(e.target.value)}
              type="date"
              className="border border-white rounded bg-transparent text-white w-full h-8 px-2"
              required
            />
          </label>

          <div className="flex w-10/12 gap-4">
            <button
            onClick={() => setIsEditConsumption(false)}
              type="button"
              className="w-10/12 bg-white text-black rounded h-8 mt-6 hover:bg-gray-200 transition-colors"
            >
              Отменить
            </button>
            <button
            type="submit"
            className="w-10/12 bg-red-600 text-white rounded h-8 mt-6 hover:bg-gray-200 transition-colors"
          >
            Сохранить
          </button>
          </div>
        </div>
      </form>
    </div>
  );
}
