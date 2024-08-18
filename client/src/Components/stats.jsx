import { useEffect, useState } from "react";
import { getStatsData } from "../service";
function Stats() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [result, setResult] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      const res = await getStatsData(userData.userId);
      setResult(res.data);
    };

    getStats();
  }, []);

  const timeArray = result.map((time) => {
    return time.time;
  });

  const filteredTimes = timeArray.filter((time) => time > 0);

  const bestReaction =
    filteredTimes.length > 0 ? Math.min(...filteredTimes) : "NA";

  const averageReaction =
    filteredTimes.length > 0
      ? Math.round(
          filteredTimes.reduce((a, b) => a + b, 0) / filteredTimes.length
        )
      : "NA";

  return (
    <div className="max-w-[800px] w-full mx-auto p-5 mt-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="capitalize text-2xl text-center p-3">
        {userData.username} reaction time insights
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col items-center text-center p-4 bg-blue-600 text-white rounded-md">
          <h1 className="text-lg font-semibold">Total Attempts</h1>
          <p className="text-2xl mt-2">{result.length}</p>
        </div>
        <div className="flex flex-col items-center text-center p-4 bg-green-600 text-white rounded-md">
          <h1 className="text-lg font-semibold">Best Reaction</h1>
          <p className="text-2xl mt-2">{bestReaction} ms</p>
        </div>
        <div className="flex flex-col items-center text-center p-4 bg-yellow-600 text-white rounded-md">
          <h1 className="text-lg font-semibold">Average Reaction Time</h1>
          <p className="text-2xl mt-2">{averageReaction} ms</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
