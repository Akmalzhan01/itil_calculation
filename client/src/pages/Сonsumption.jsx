import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/modal/Consumption-modal";
import { IoAddCircleOutline } from "react-icons/io5";

function Сonsumption() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isModalOpen, setIsModalOpen] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    axios
      .get("https://itil-calculation.vercel.app/api/consumption")
      .then((success) => {
        setData(success.data);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-4">Расход</h2>
        <div onClick={() => setIsModalOpen(true)} className="bg-red-600 rounded w-1/3 h-8 p-3 hover:bg-red-400 hover:transition-all text-white flex justify-center items-center">
          <IoAddCircleOutline className="size-8" />
          Добавить
        </div>
      </div>
      <div>
        {data.map((item, idx) => (
          <div key={idx} className="flex w-full justify-between shadow p-4">
            <h2 className="w-32 truncate">{item.description}</h2>
            <h2 className="bg-red-200 rounded-2xl px-3 text-red-800">
              {item.value}сом
            </h2>
            <h2 className="">{item.date.slice(0, 10)}</h2>
          </div>
        ))}
      </div>
      {/* Modal Oyna */}
      {isModalOpen && <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}

export default Сonsumption;
