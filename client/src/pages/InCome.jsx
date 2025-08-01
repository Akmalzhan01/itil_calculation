/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { ConsumptionApi } from "../utils/apis";
import axios from "axios";
import IncomeModal from "../components/modal/Income-modal"
import IncomeDetail from "../components/detail/Income-detail"
import IncomeEdit from "../components/edit/Income-edit"

function Income() {
  const [data, setData] = useState([]);
  const [incomeDetailed, setIncomeDetailed] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditIncome, setIsEditIncome] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ConsumptionApi.getIncome();
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const incomeDetail = async (id) => {
    try {
      await axios
        .get("https://itil-calculation.vercel.app/api/income/" + id)
        .then((success) => {
          setIncomeDetailed(success.data);
          setIsDetailOpen(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-4">Приход - {data.length}</h2>
        <div
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 rounded w-1/3 h-8 p-3 hover:bg-green-400 hover:transition-all text-white flex justify-center items-center"
        >
          <IoAddCircleOutline className="size-8" />
          Добавить
        </div>
      </div>
      <div>
        {data?.map((item, idx) => (
          <div
            onClick={() => incomeDetail(item._id)}
            key={idx}
            className="flex w-full justify-between shadow p-4"
          >
            <h2 className="w-32 truncate">{item.description}</h2>
            <h2 className="bg-green-200 rounded-2xl px-3 text-green-800">
              {item.value}сом
            </h2>
            <h2 className="">{item.date.slice(0, 10)}</h2>
          </div>
        ))}
      </div>

      {/* edit oyna */}
      {isEditIncome && (
        <IncomeEdit
          incomeDetailed={incomeDetailed}
          setIncomeDetailed={setIncomeDetailed}
          setIsEditIncome={setIsEditIncome}
          isEditIncome={isEditIncome}
        />
      )}

      {/* Detail oyna */}
      {isDetailOpen && (
        <IncomeDetail
          isDetailOpen={isDetailOpen}
          setIsDetailOpen={setIsDetailOpen}
          incomeDetailed={incomeDetailed}
          setIncomeDetailed={setIncomeDetailed}
          setIsEditIncome={setIsEditIncome}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {/* Modal Oyna */}
      {isModalOpen && (
        <IncomeModal
          isOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          incomeDetailed={incomeDetailed}
          setIncomeDetailed={setIncomeDetailed}
        />
      )}
    </div>
  );
}

export default Income;
