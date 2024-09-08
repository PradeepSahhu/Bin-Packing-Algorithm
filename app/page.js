"use client";
import { useState } from "react";
import { FaCheckToSlot } from "react-icons/fa6";

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
    setFunctionCalled("Worst-Fit Algorithm");
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
    setFunctionCalled("Next-Fit Algorithm");
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
    setFunctionCalled("First-Fit Algorithm");
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
    setFunctionCalled("Best-Fit Algorithm");
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
            className="w-full bg-blue-500 text-white py-2 rounded-lg mb-4 flex justify-center hover:scale-95 hover:text-black transition-all duration-300"
          >
            Next-Fit Algorithm <FaCheckToSlot className="text-2xl ml-2" />
          </button>
          {/* Add buttons for other algorithms */}
          <div className="space-y-4 mb-4 absolute top-[15rem] left-[15rem]">
            <button
              onClick={firstFit}
              className="bg-green-500 text-white py-2 px-4 rounded-lg flex justify-center hover:scale-95 hover:text-black transition-all duration-300"
            >
              First-Fit Algorithm <FaCheckToSlot className="text-2xl ml-2" />
            </button>
            <button
              name="Best-Fit"
              onClick={() => bestFit()}
              className="bg-purple-500 text-white py-2 px-4 rounded-lg flex justify-center hover:scale-95 hover:text-black transition-all duration-300"
            >
              Best-Fit Algorithm <FaCheckToSlot className="text-2xl ml-2" />
            </button>
            <button
              onClick={worstFit}
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg flex justify-center hover:scale-95 hover:text-black transition-all duration-300"
            >
              Worst-Fit Algorithm
              <FaCheckToSlot className="text-2xl ml-2" />
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
                  className={`flex  flex-col border-yellow-600 border-2 hover:scale-125 transition-all duration-300 justify-end`}
                  style={{ height: `${capacity * 20}px` }} // Set a fixed height for the bin
                >
                  {bin.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`w-14  bg-gray-600 text-white flex items-center justify-center border-2 border-black`}
                      style={{ height: `${item * 20}px` }} // Divide bin height equally among items
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
      {/* Division */}
      <div className="grid grid-cols-2 grid-rows-2 h-[100vh] my-10">
        <div className="col-start-1 col-end-1 row-start-1 row-end-1 flex justify-center items-center border-yellow-400 border-2 ">
          <div>
            {bins.length > 0 ? (
              <div>
                <div className="flex space-x-4 flex-end">
                  {bins.map((bin, binIndex) => (
                    <div
                      key={binIndex}
                      className={`flex  flex-col border-yellow-600 border-2 hover:scale-125 transition-all duration-300 flex-end`}
                      style={{ height: `${capacity * 20}px` }}
                    >
                      {bin.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className={`w-14  bg-gray-600 text-white flex items-center justify-center border-2 border-black `}
                          style={{ height: `${item * 20}px` }} // Divide bin height equally among items
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="flex justify-center">
              <p className="text-2xl text-yellow-400 my-5">
                Worst-Fit Function
              </p>
            </div>
          </div>
        </div>
        <div className="col-start-1 col-end-1 row-start-2 row-end-2 flex justify-center items-center border-yellow-400 border-2 ">
          <div>
            {bins.length > 0 ? (
              <div>
                <div className="flex space-x-4 flex-end">
                  {bins.map((bin, binIndex) => (
                    <div
                      key={binIndex}
                      className={`flex  flex-col border-yellow-600 border-2 hover:scale-125 transition-all duration-300 flex-end`}
                      style={{ height: `${capacity * 20}px` }}
                    >
                      {bin.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className={`w-14  bg-gray-600 text-white flex items-center justify-center border-2 border-black `}
                          style={{ height: `${item * 20}px` }} // Divide bin height equally among items
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="flex justify-center">
              <p className="text-2xl text-yellow-400 my-5">
                Worst-Fit Function
              </p>
            </div>
          </div>
        </div>
        <div className="col-start-2 col-end-2 row-start-1 row-end-1 flex justify-center items-center border-yellow-400 border-2 ">
          <div>
            {bins.length > 0 ? (
              <div>
                <div className="flex space-x-4 flex-end">
                  {bins.map((bin, binIndex) => (
                    <div
                      key={binIndex}
                      className={`flex  flex-col border-yellow-600 border-2 hover:scale-125 transition-all duration-300 flex-end`}
                      style={{ height: `${capacity * 20}px` }}
                    >
                      {bin.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className={`w-14  bg-gray-600 text-white flex items-center justify-center border-2 border-black `}
                          style={{ height: `${item * 20}px` }} // Divide bin height equally among items
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="flex justify-center">
              <p className="text-2xl text-yellow-400 my-5">
                Worst-Fit Function
              </p>
            </div>
          </div>
        </div>
        <div className="col-start-2 col-end-2 row-start-2 row-end-2 flex justify-center items-center border-yellow-400 border-2 ">
          <div>
            {bins.length > 0 ? (
              <div>
                <div className="flex space-x-4 flex-end">
                  {bins.map((bin, binIndex) => (
                    <div
                      key={binIndex}
                      className={`flex  flex-col border-yellow-600 border-2 hover:scale-125 transition-all duration-300 flex-end`}
                      style={{ height: `${capacity * 20}px` }}
                    >
                      {bin.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className={`w-14  bg-gray-600 text-white flex items-center justify-center border-2 border-black `}
                          style={{ height: `${item * 20}px` }} // Divide bin height equally among items
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="flex justify-center">
              <p className="text-2xl text-yellow-400 my-5">
                Worst-Fit Function
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
