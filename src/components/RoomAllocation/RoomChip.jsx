import { CustomInputNumber } from '@/components';

const RoomChip = ({
  capacity,
  price,
  guest: { adult, child },
  remaining: { adult: remainingAdult, child: remainingChild },
  onChange,
}) => (
  <div className="flex w-full flex-col gap-2 text-sm">
    <span>{`${capacity} 人房間：${adult + child} 人${price ? `，共 ${price} 元` : ''}`}</span>
    <div className="flex items-center justify-between">
      <div className="flex flex-col text-xs">
        <span>大人</span>
        <span className="text-gray-400">年齡 20+</span>
      </div>
      <CustomInputNumber
        value={adult}
        onChange={({ target: { value } }) =>
          onChange({ adult: +value, child: child })
        }
        max={Math.min(remainingAdult + adult, capacity - child)}
        min={+!!child}
        disabled={!adult && !remainingAdult}
        onBlur={(e) => console.log(e)}
      />
    </div>
    <div className="flex items-center justify-between">
      <span className="text-xs">小孩</span>
      <CustomInputNumber
        value={child}
        onChange={({ target: { value } }) =>
          onChange({ adult: adult, child: +value })
        }
        max={Math.min(remainingChild + child, capacity - (adult || 1))}
        disabled={(!adult || !remainingChild) && !child}
        onBlur={(e) => console.log(e)}
      />
    </div>
  </div>
);

export default RoomChip;
