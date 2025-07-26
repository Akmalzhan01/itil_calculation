/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5";
import { IoMdTrash } from "react-icons/io";
import { ConsumptionApi } from "../../utils/apis";



function ConsumptionDetail({setIsDetailOpen,consumptionDetailed,setIsEditConsumption}) {

    const handleDelete = async (id) => {
      try {
        await ConsumptionApi.deleteConsumption(id);
        setIsDetailOpen(false);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

  return (
    <>
      <div className="fixed inset-0 z-50 flex flex-col items-center p-4 bg-black/90 text-white">
        <div className="w-full flex justify-end">
          <IoClose
            onClick={() => setIsDetailOpen(false)}
            className="w-7 h-7 cursor-pointer"
          />
        </div>
        <div className="mt-24 py-6 border border-white rounded-xl w-10/12 flex flex-col items-center">
        <div className="w-10/12 flex justify-between">
          <h2 className="font-bold text-xl">Расход</h2>
          <div onClick={() => handleDelete(consumptionDetailed._id)} className="p-2 rounded bg-red-600">
          <IoMdTrash className="w-6 h-6" />
          </div>
        </div>
          <div className="w-full border mt-5 p-4 bg-white/10 flex flex-col gap-4">
            <h1>
              <b className="text-gray-300">Название:</b>{" "}
              {consumptionDetailed.description}
            </h1>
            <h1>
              <b className="text-gray-300">Сумма:</b>{" "}
              {consumptionDetailed.value}сом
            </h1>
            <h1 className="">
              <b className="text-gray-300">Дата:</b>{" "}
              {consumptionDetailed.date.slice(0, 10)}
            </h1>
          </div>
          <div className="w-full flex gap-4 px-4 justify-center items-center">
            <button
              onClick={() => setIsDetailOpen(false)}
              type="submit"
              className="w-10/12 bg-white text-black rounded h-8 mt-6 hover:bg-gray-200 transition-colors"
            >
              Отменить
            </button>
            <button
            onClick={() => {
              setIsDetailOpen(false)
              setIsEditConsumption(true)
            }}
              type="submit"
              className="w-10/12 bg-red-500 text-white rounded h-8 mt-6 hover:bg-red-700 transition-colors"
            >
              Редактировать
            </button>
          </div>
        </div>
      </div>
    </>
  );}


export default ConsumptionDetail;
