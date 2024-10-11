const worstFitAlgorithm = (
  setFunctionCalled,
  setWorstBins,
  items,
  capacity
) => {
  setFunctionCalled("Worst-Fit Algorithm");
  const binList = [];

  items.forEach((item) => {
    let worstBinIndex = -1;
    let maxSpace = -1;

    for (let i = 0; i < binList.length; i++) {
      if (
        binList[i].remainingSpace >= item &&
        binList[i].remainingSpace > maxSpace
      ) {
        worstBinIndex = i;
        maxSpace = binList[i].remainingSpace;
      }
    }

    if (worstBinIndex === -1) {
      binList.push({
        items: [item],
        remainingSpace: capacity - item,
      });
    } else {
      binList[worstBinIndex].items.push(item);
      binList[worstBinIndex].remainingSpace -= item;
    }
  });

  setWorstBins(binList.map((bin) => bin.items));
};

const nextFitAlgorithm = (setFunctionCalled, setNextBins, items, capacity) => {
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
  //   setBins(binList);
  // setFirstBins(binList);
  setNextBins(binList);
  //   set(binList);
  //   setBestBins(binList);
};

const firstFitAlgorithm = (
  setFunctionCalled,
  setFirstBins,
  items,
  capacity
) => {
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
  //   setBins(binList.map((bin) => bin.items));
  setFirstBins(binList.map((bin) => bin.items));
};
const bestFitAlgorithm = (setFunctionCalled, setBestBins, items, capacity) => {
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
  //   setBins(binList.map((bin) => bin.items));
  setBestBins(binList.map((bin) => bin.items));
};
export {
  firstFitAlgorithm,
  bestFitAlgorithm,
  worstFitAlgorithm,
  nextFitAlgorithm,
};
