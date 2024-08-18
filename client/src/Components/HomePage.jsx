import { useEffect, useState, useRef } from "react";
import { uploadResult } from "../service/index";
import { useNavigate } from "react-router-dom";
import Stats from "./stats";
import LeaderBoard from "./leaderBoard";

function HomePage() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [viewScreen, setViewScreen] = useState("blue");
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const preventChange = useRef(false); // Ref to track if a click has occurred
  const navigate = useNavigate();

  const startGame = () => {
    setViewScreen("red");
    preventChange.current = false; // Reset preventChange when starting the game

    const timer = setTimeout(() => {
      if (!preventChange.current) {
        setViewScreen("green");
      }
    }, 5000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (viewScreen === "green") {
      if (intervalId) {
        clearInterval(intervalId);
      }
      // Reset the timer to 0ms
      setTime(0);

      // Start the timer
      const id = setInterval(() => {
        setTime((prevState) => prevState + 1);
      }, 1);

      setIntervalId(id);
    } else {
      // Clear the interval if viewScreen is not green
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [viewScreen]);

  const stopTimer = async () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    await uploadResult(time, userData);
  };

  const handleScreenClick = () => {
    preventChange.current = true; // Set preventChange to true to stop changing the screen
    stopTimer();
    setViewScreen("yellow");
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {viewScreen === "blue" && (
        <>
          <div className="max-w-[800px] w-full mx-auto p-5 mt-4 bg-blue-600 rounded-t-lg relative">
            <h1 className="text-center text-lg text-white">
              Test Your Might{" "}
              <span className="font-semibold">
                {userData.username.toUpperCase()}
              </span>
            </h1>
            <button
              className="absolute text-2xl top-3 right-5 text-white"
              onClick={logout}
            >
              X
            </button>
          </div>
          <div className="max-w-[800px] w-full mx-auto">
            <div className="flex justify-center items-center bg-blue-600 max-w-[800px] h-[40vh] w-full mx-auto p-6">
              <div className="text-center text-white">
                <h2 className="text-2xl">
                  {userData.username.toUpperCase()}'s Reaction Time Test
                </h2>
                <p className="text-xl my-5">
                  When the red box turns green, click as quickly as you can.
                </p>
                <h2
                  onClick={startGame}
                  className="cursor-pointer underline text-lg"
                >
                  Click to start
                </h2>
              </div>
            </div>
          </div>
        </>
      )}

      {viewScreen === "red" && (
        <>
          <div className="max-w-[800px] w-full mx-auto p-5 mt-4 bg-red-700 rounded-t-lg">
            <h1 className="text-center text-lg text-white">
              Test Your Might{" "}
              <span className="font-semibold">
                {userData.username.toUpperCase()}
              </span>
            </h1>
          </div>
          <div
            onClick={handleScreenClick}
            className="max-w-[800px] w-full mx-auto"
          >
            <div className="flex justify-center items-center bg-red-700 max-w-[800px] h-[40vh] w-full mx-auto p-6">
              <div className="text-center text-white">
                <h2 className="text-5xl">{userData.username.toUpperCase()}</h2>
                <p className="text-xl mt-5">Wait for green</p>
                <span className="text-4xl">...</span>
              </div>
            </div>
          </div>
        </>
      )}

      {viewScreen === "green" && (
        <>
          <div className="max-w-[800px] w-full mx-auto p-5 mt-4 bg-green-600 rounded-t-lg">
            <h1 className="text-center text-lg text-white">
              Test Your Might{" "}
              <span className="font-semibold">
                {userData.username.toUpperCase()}
              </span>
            </h1>
          </div>
          <div className="max-w-[800px]  bg-green-600 w-full mx-auto flex">
            {intervalId && (
              <h1 className="text-4xl h-full my-auto text-white px-5">
                {time} ms
              </h1>
            )}
            <div
              onClick={stopTimer}
              className="flex justify-center items-center max-w-[800px] h-[40vh] w-full mx-auto p-6 relative"
            >
              {intervalId === null ? (
                <div className="text-center">
                  <h1 className="text-3xl">Game Over!</h1>
                  <h1 className="text-5xl">Reacted in {time} ms</h1>
                </div>
              ) : (
                <p className="text-4xl text-white text-center">
                  {userData.username.toUpperCase()}
                  <br />
                  <span className="block mt-5">...</span>
                  <br />
                  CLICK NOW
                </p>
              )}
              {intervalId === null && (
                <button
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => setViewScreen("blue")}
                >
                  Restart
                </button>
              )}
            </div>
            {intervalId && (
              <h1 className="text-4xl h-full my-auto text-white px-5">
                {time} ms
              </h1>
            )}
          </div>
        </>
      )}
      {viewScreen === "yellow" && (
        <>
          <div className="max-w-[800px] w-full mx-auto p-5 mt-4 bg-yellow-600 rounded-t-lg">
            <h1 className="text-center text-lg text-white">
              Test Your Might{" "}
              <span className="font-semibold">
                {userData.username.toUpperCase()}
              </span>
            </h1>
          </div>
          <div
            onClick={() => setViewScreen("blue")}
            className="max-w-[800px] w-full mx-auto"
          >
            <div className="flex justify-center items-center bg-yellow-600 max-w-[800px] h-[40vh] w-full mx-auto p-6">
              <div className="text-center text-white">
                <h2 className="text-5xl">{userData.username.toUpperCase()}</h2>
                <p className="text-xl mt-5">
                  Stay calm and wait for green, don't be too keen!
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      <Stats />
      <LeaderBoard />
    </>
  );
}

export default HomePage;
