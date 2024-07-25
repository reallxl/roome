import { useEffect, useMemo, useState } from 'react';

import RoomChip from './RoomChip';
import { getDefaultRoomAllocation } from '@/utils/helpers';

const RoomAllocation = ({ guest, rooms, onChange, onCancel }) => {
  const defaultArrangement = useMemo(
    () => getDefaultRoomAllocation(guest, rooms),
    [guest, rooms]
  );
  const [arrangement, setArrangement] = useState(defaultArrangement);

  useEffect(() => {
    if (arrangement === defaultArrangement || !onChange) return;
    onChange(arrangement);
  }, [arrangement, defaultArrangement, onChange]);

  const getHandleChangeRoomArrangement =
    (index) =>
    ({ adult, child }) => {
      const { adult: prevAdult, child: prevChild } = arrangement[index];

      if (adult === prevAdult && child === prevChild) return;

      setArrangement((arranged) => {
        const arrangement = arranged.slice();
        const roomArrangement = arrangement[index];

        const { roomPrice, adultPrice, childPrice } = roomArrangement;

        arrangement[index] = {
          ...roomArrangement,
          adult,
          child,
          price: adult
            ? roomPrice + adult * adultPrice + child * childPrice
            : 0,
        };

        return arrangement;
      });
    };

  const remainingGuest = arrangement.reduce(
    (acc, { adult, child }) => ({
      adult: acc.adult - adult,
      child: acc.child - child,
    }),
    guest
  );

  const renderRoomChips = () => (
    <>
      <div className="h-px grow overflow-y-scroll">
        {arrangement.map(({ price, capacity, ...arranged }, index) => (
          <div key={index} className="w-full">
            <RoomChip
              capacity={capacity}
              price={price}
              guest={arranged}
              remaining={remainingGuest}
              onChange={getHandleChangeRoomArrangement(index)}
            />
            <hr className="my-4" />
          </div>
        ))}
      </div>
      <div className="w-full font-bold">{`總計：${arrangement.reduce((acc, { price }) => acc + price, 0)} 元`}</div>
    </>
  );

  const renderButton = () => (
    <button
      className="w-full rounded-md border-2 border-primary bg-white p-4 font-bold text-primary hover:bg-primary hover:text-white"
      onClick={onCancel}
    >
      搜尋更多
    </button>
  );

  const { adult, child } = guest;
  const { adult: remainingAdult, child: remainingChild } = remainingGuest;

  return (
    <>
      <div className="w-full font-bold">
        {`住客人數：${adult} 位大人，${child} 位小孩／${arrangement.length} 房`}
      </div>
      <div className="w-full rounded-md bg-secondary p-2 text-xs md:p-4">{`尚未分配人數： ${remainingAdult} 位大人， ${remainingChild} 位小孩`}</div>
      {arrangement.length
        ? renderRoomChips()
        : '很抱歉，目前沒有適合您的房型，請修改搜尋條件再試試看。'}
      {renderButton()}
    </>
  );
};

export default RoomAllocation;
