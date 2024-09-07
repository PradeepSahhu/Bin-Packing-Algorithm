"use client";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [capacity, setCapacity] = useState();
  const [bins, setBins] = useState([]);
  const [functionCalled, setFunctionCalled] = useState();

  const handleInputChange = (e) => {
    const itemSizes = e.target.value.split(",").map(Number);
    setItems(itemSizes);
  };

  const handleCapacityChange = (e) => setCapacity(Number(e.target.value));

  const worstFit = () => {
    setFunctionCalled("Worst-Fit");
    const binList = [];

    items.forEach((item) => {
      let worstBinIndex = -1;
      let maxSpace = -1;

      // Find the bin with the most remaining space that can still fit the item
      for (let i = 0; i < binList.length; i++) {
        if (
          binList[i].remainingSpace >= item &&
          binList[i].remainingSpace > maxSpace
        ) {
          worstBinIndex = i;
          maxSpace = binList[i].remainingSpace;
        }
      }

      // If no bin is found, create a new bin
      if (worstBinIndex === -1) {
        binList.push({
          items: [item],
          remainingSpace: capacity - item,
        });
      } else {
        // Add the item to the worst bin and update its remaining space
        binList[worstBinIndex].items.push(item);
        binList[worstBinIndex].remainingSpace -= item;
      }
    });

    setBins(binList.map((bin) => bin.items));
  };

  const nextFit = () => {
    setFunctionCalled("Next-Fit");
    console.table([capacity, items]);
    let binCount = 0;
    let remainingSpace = capacity;
    const binList = [[]];
    items.forEach((item) => {
      if (item > remainingSpace) {
        binCount++;
        remainingSpace = capacity - item;
        binList.push([item]);
      } else {
        remainingSpace -= item;
        binList[binCount].push(item);
        // binList[binCount] = item;
      }
    });
    setBins(binList);
  };

  // Implementations for other algorithms will go here (e.g., firstFit, bestFit)
  const firstFit = () => {
    setFunctionCalled("First-Fit");
    const binList = [];
    items.forEach((item) => {
      let placed = false;
      for (let i = 0; i < binList.length; i++) {
        if (binList[i].remainingSpace >= item) {
          binList[i].items.push(item);
          binList[i].remainingSpace -= item;
          placed = true;
          break;
        }
      }
      if (!placed) {
        binList.push({
          items: [item],
          remainingSpace: capacity - item,
        });
      }
    });
    setBins(binList.map((bin) => bin.items));
  };
  const bestFit = () => {
    setFunctionCalled("Best-Fit");
    const binList = [];
    items.forEach((item) => {
      let bestBinIndex = -1;
      let minSpace = capacity + 1;
      for (let i = 0; i < binList.length; i++) {
        if (
          binList[i].remainingSpace >= item &&
          binList[i].remainingSpace < minSpace
        ) {
          bestBinIndex = i;
          minSpace = binList[i].remainingSpace;
        }
      }
      if (bestBinIndex === -1) {
        binList.push({
          items: [item],
          remainingSpace: capacity - item,
        });
      } else {
        binList[bestBinIndex].items.push(item);
        binList[bestBinIndex].remainingSpace -= item;
      }
    });
    setBins(binList.map((bin) => bin.items));
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-black">
        <h1 className="text-3xl font-bold mb-5">Bin Packing Algorithms</h1>
        <div className="w-96 p-5 bg-white rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Items (comma-separated)
            </label>
            <input
              type="text"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="e.g. 2, 5, 4, 7, 1, 3"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Bin Capacity</label>
            <input
              type="number"
              onChange={handleCapacityChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="e.g. 10"
            />
          </div>
          <button
            onClick={nextFit}
            className="w-full bg-blue-500 text-white py-2 rounded-lg mb-4"
          >
            Next-Fit Algorithm
          </button>
          {/* Add buttons for other algorithms */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={firstFit}
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              First-Fit
            </button>
            <button
              name="Best-Fit"
              onClick={() => bestFit()}
              className="bg-purple-500 text-white py-2 px-4 rounded-lg"
            >
              Best-Fit
            </button>
            <button
              onClick={worstFit}
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg"
            >
              Worst-Fit
            </button>
          </div>
          <div className="mt-5">
            <h2 className="text-xl font-bold">
              Bins: <span className="text-yellow-400">{functionCalled}</span>
            </h2>
            {bins.length > 0 ? (
              bins.map((bin, index) => (
                <div key={index} className="mt-2 bg-gray-200 p-2 rounded-md">
                  Bin {index + 1}: {bin.join(", ")}
                </div>
              ))
            ) : (
              <p>No bins packed yet.</p>
            )}
          </div>
        </div>
      </div>
      <div className="h-[100vh] w-full flex items-center justify-center ">
        {bins.length > 0 ? (
          <div>
            <div className="flex space-x-4">
              {bins.map((bin, binIndex) => (
                <div
                  key={binIndex}
                  className="flex flex-col border-yellow-600 border-2 hover:scale-125 transition-all duration-300"
                >
                  {bin.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="w-14 h-10 bg-gray-600 text-white flex items-center justify-center"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div>
              <div className="items-center justify-center flex">
                <p className="text-2xl m-5">{functionCalled}</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
