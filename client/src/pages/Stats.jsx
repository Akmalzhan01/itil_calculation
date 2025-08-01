import { useEffect, useState } from "react";
import { ConsumptionApi } from "../utils/apis";

function Stats() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!year || !month) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await ConsumptionApi.getStats(year, month);
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  // Yoki oy o'zgarganda avtomatik yuklash
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500); // 0.5 sekund debounce
    
    return () => clearTimeout(timer);
  }, [year, month]);

  return (
    <div className="space-y-4">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-semibold">Статистика</h2>
        <div className="w-full flex items-center justify-end gap-2">
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-18 bg-blue-200 p-1 rounded outline-none"
            type="number"
            placeholder="Year"
            min="2000"
            max="2100"
          />
          <input
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-18 bg-blue-200 p-1 rounded outline-none"
            type="number"
            placeholder="Month"
            min="1"
            max="12"
          />
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      {/* Ma'lumotlarni ko'rsatish uchun qism */}
      {data && (
        <div className="flex flex-col w-full gap-4 p-4 bg-gray-100 rounded">
          <div className="flex justify-between gap-2">
            <div className="flex justify-center items-center bg-green-200 border border-green-600 gap-2 w-1/2 h-20">
              <h1 className="font-medium">Приход:</h1>
              <span>{data.totalIncome || 0} сом</span>
            </div>
            <div className="flex justify-center items-center bg-red-200 border border-red-600 gap-2 w-1/2 h-20">
              <h1 className="font-medium">Расход:</h1>
              <span>{data.totalConsumption || 0} сом</span>
            </div>
          </div>
          <div className="flex justify-center items-center bg-blue-200 border border-blue-600 gap-2 w-full h-20">
            <h1 className="font-medium">Прибыль:</h1>
            <span className={data.totalSum >= 0 ? "text-green-600" : "text-red-600"}>
              {data.totalSum || 0} сом
            </span>
          </div>
        </div>
      )}

      {!data && !loading && !error && year && month && (
        <div className="text-gray-500">Пока нет данных</div>
      )}
    </div>
  );
}

export default Stats;