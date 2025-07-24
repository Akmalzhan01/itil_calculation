/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import Modal from "../components/modal/Consumption-modal";
import { IoAddCircleOutline } from "react-icons/io5";
import { ConsumptionApi } from "../utils/apis";
import ConsumptionDetail from "../components/detail/Consumption-detail";
import axios from "axios";

function Сonsumption() {
  const [data, setData] = useState([]);
  const [consumptionDetailed, setConsumptionDetailed] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ConsumptionApi.getConsumptions();
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const consumptionDetail = async (id) => {
    console.log(id);
    try {
     await axios
        .get("https://itil-calculation.vercel.app/api/consumption/" + id)
        .then((success) => setConsumptionDetailed(success));
    } catch (error) {
      console.log(error);
    }
  };

  console.log(consumptionDetailed);
  

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-4">Расход - {data.length}</h2>
        <div
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 rounded w-1/3 h-8 p-3 hover:bg-red-400 hover:transition-all text-white flex justify-center items-center"
        >
          <IoAddCircleOutline className="size-8" />
          Добавить
        </div>
      </div>
      <div>
        {data?.map((item, idx) => (
          <div
            onClick={() => consumptionDetail(item._id)}
            key={idx}
            className="flex w-full justify-between shadow p-4"
          >
            <h2 className="w-32 truncate">{item.description}</h2>
            <h2 className="bg-red-200 rounded-2xl px-3 text-red-800">
              {item.value}сом
            </h2>
            <h2 className="">{item.date.slice(0, 10)}</h2>
          </div>
        ))}
      </div>
      {/* Detail oyna */}
      {isDetailOpen && (
        <ConsumptionDetail
          isDetailOpen={isDetailOpen}
          setIsDetailOpen={setIsDetailOpen}
        />
      )}

      {/* Modal Oyna */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
}

export default Сonsumption;
