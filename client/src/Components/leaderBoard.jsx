import { useEffect, useState } from "react";
import { fetchAllResultApi, leaderboardAPI } from "../service";
function LeaderBoard() {
  const [data, setData] = useState([]);
  const [userScore, setUserScore] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      const res = await fetchAllResultApi();
      setData(res.data);
    };

    getAllData();
  }, []);

  const resultArray = data.map((result) => ({
    userId: result.userId,
    time: result.time,
  }));
  const filteredArray = resultArray.filter((score) => score.time > 0);
  console.log(filteredArray);
  // Extract unique times and sort them
  const uniqueTimes = [
    ...new Set(filteredArray.map((score) => score.time)),
  ].sort((a, b) => a - b);

  // Find the top three distinct times
  const topTimes = uniqueTimes.slice(0, 3);

  // Filter the scores for the top three times
  const topScores = resultArray.filter((score) =>
    topTimes.includes(score.time)
  );
  const scoreUserIds = topScores.map((id) => {
    return id.userId;
  });

  const scoreId = scoreUserIds.toString();

  useEffect(() => {
    if (scoreId.length !== 0) {
      const getTopScorers = async () => {
        const res = await leaderboardAPI(scoreId);
        setUserScore(res.data);
      };
      getTopScorers();
    }
  }, [scoreId]);

  return (
    <div className="max-w-[800px] w-full mx-auto p-5 mt-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="capitalize text-2xl text-center p-3">Leaderboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {userScore.length !== 0 ? (
          <>
            <div className="flex flex-col items-center text-center p-4 bg-blue-600 text-white rounded-md">
              <h1 className="text-lg font-semibold">
                P1: {userScore[0]?.username || "NA"}
              </h1>
              <p className="text-2xl mt-2">
                Time: {userScore[0]?.time || "0"} ms
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-green-600 text-white rounded-md">
              <h1 className="text-lg font-semibold">
                P2: {userScore[1]?.username || "NA"}
              </h1>
              <p className="text-2xl mt-2">
                Time: {userScore[1]?.time || "0"} ms
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-yellow-600 text-white rounded-md">
              <h1 className="text-lg font-semibold">
                P3: {userScore[2]?.username || "NA"}
              </h1>
              <p className="text-2xl mt-2">
                Time: {userScore[2]?.time || "0"} ms
              </p>
            </div>
          </>
        ) : (
          <h1 className="col-span-full text-center text-lg font-semibold text-gray-700">
            Leaderboard is clear—who will rise to claim the top spot?
          </h1>
        )}
      </div>
    </div>
  );
}

export default LeaderBoard;
