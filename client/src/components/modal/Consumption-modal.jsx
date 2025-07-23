import { useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios"

// eslint-disable-next-line react/prop-types
function ConsumptionModal({ setIsModalOpen }) {
  const [description, setDescription] = useState("");
  const [summa, setSumma] = useState(0);
  const [date, setDate] = useState("");
  
  const handleAdd = async () => {
    try {
      const datas = await axios.post("https://itil-calculation.vercel.app/api/consumption", {description, summa, date})
      .then((success) => {
        console.log(success, datas);
        
      })
    } catch (error) {
      console.log(error);
      
    }
  }
  

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center p-4 bg-black/90 text-white">
      <div className="w-full flex justify-end">
        <IoClose onClick={() => setIsModalOpen(false)} className="w-7 h-7" />
      </div>
      <form className="mt-24 py-6 border border-white rounded-xl w-10/12 flex flex-col items-center">
        <h2 className="font-bold text-xl">Добавить расход</h2>
        <div className="w-full border mt-5"></div>
        <div className="w-full flex flex-col justify-center items-center">
          <label className="mt-6 w-10/12 flex flex-col">
            Название:
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="border border-white rounded text-white w-full h-8"
            />
          </label>
          <label className="mt-6 w-10/12 flex flex-col">
            Сумма:
            <input
              value={summa}
              onChange={(e) => setSumma(e.target.value)}
              type="number"
              className="border border-white rounded text-white w-full h-8"
            />
          </label>
          <label className="mt-6 w-10/12 flex flex-col">
            Сумма:
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="border border-white rounded text-white w-full h-8"
            />
          </label>
          <button onClick={handleAdd } className="w-10/12 bg-white text-black rounded h-8 mt-6">
            Добавить
          </button>
        </div>
      </form>
    </div>
  );
}

export default ConsumptionModal;
