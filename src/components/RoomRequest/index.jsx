import { useRef, useState } from 'react';

import { CustomInputNumber } from '@/components';
import { TEST_SETS } from '@/data/mock';

const RoomRequest = ({ onSubmit }) => {
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const ref = useRef();

  const renderGuestSettingField = (label, value, setValue) => (
    <div className="flex w-full items-center gap-2">
      <label>{label}</label>
      <CustomInputNumber
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
      />
    </div>
  );

  const handleSelectPreset = ({ target: { id } }) => {
    const {
      adult: _adult,
      child: _child,
      rooms,
    } = TEST_SETS[id.split('_').slice(-1)[0]];

    setAdult(_adult);
    setChild(_child);
    ref.current.value = JSON.stringify(rooms);
  };

  const renderRoomSettingField = () => (
    <div className="flex w-full items-center justify-between gap-2">
      <label>房間：</label>
      <div className="w-px grow">
        <textarea
          className="min-h-[50vh] w-full resize-none rounded-md bg-secondary p-2 md:min-h-[33vh]"
          placeholder={JSON.stringify(TEST_SETS[0].rooms)}
          ref={ref}
        />
      </div>
    </div>
  );

  const renderPresetSelector = () => (
    <fieldset className="flex w-full gap-2" onChange={handleSelectPreset}>
      {Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
        <div key={i} className="flex items-center gap-1">
          <input
            className="accent-primary"
            type="radio"
            name="radio_room_preset"
            id={`room_preset_${i}`}
          />
          <label htmlFor={`room_preset_${i}`}>{`Preset ${i + 1}`}</label>
        </div>
      ))}
    </fieldset>
  );

  const renderButton = () => (
    <button
      className="rounded-md border-2 border-primary bg-primary p-4 font-bold text-white hover:bg-white hover:text-primary"
      onClick={() =>
        onSubmit({
          adult,
          child,
          rooms: ref.current.value
            ? JSON.parse(ref.current.value)
            : TEST_SETS[0].rooms,
        })
      }
    >
      搜出好房
    </button>
  );

  return (
    <>
      {renderGuestSettingField('大人：', adult, setAdult)}
      {renderGuestSettingField('小孩：', child, setChild)}
      {renderRoomSettingField()}
      {renderPresetSelector()}
      {renderButton()}
    </>
  );
};

export default RoomRequest;
