export const getDefaultRoomAllocation = ({ adult, child }, rooms) => {
  if (!adult) return [];

  let lowest = Infinity;
  let bestArragement;

  const tryArrangeToRoom = (remainingAdult, remainingChild, arranged) => {
    const currentRoomIndex = arranged.length;
    if (
      currentRoomIndex >= rooms.length ||
      rooms
        .slice(currentRoomIndex)
        .reduce((acc, { capacity }) => acc + capacity, 0) <
        remainingAdult + remainingChild
    )
      return;

    const { capacity, roomPrice, adultPrice, childPrice } =
      rooms[currentRoomIndex];

    tryArrangeToRoom(remainingAdult, remainingChild, [...arranged, [0, 0, 0]]);

    for (let a = 1; a <= Math.min(capacity, remainingAdult); a++) {
      for (let c = 0; c <= Math.min(capacity - a, remainingChild); c++) {
        const arrangement = [
          ...arranged,
          [a, c, roomPrice + a * adultPrice + c * childPrice],
        ];

        if (a === remainingAdult && c === remainingChild) {
          const totalPrice = arrangement.reduce(
            (acc, [, , price]) => acc + price,
            0
          );

          if (totalPrice < lowest) {
            lowest = totalPrice;
            bestArragement = arrangement;
          }
        } else
          tryArrangeToRoom(remainingAdult - a, remainingChild - c, arrangement);
      }
    }
  };

  tryArrangeToRoom(adult, child, []);

  return (
    bestArragement?.map(([adult, child, price]) => ({
      adult,
      child,
      price,
    })) ?? []
  );
};
