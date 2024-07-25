import { useEffect, useState } from 'react';

import {
  DEFAULT_HOLD_STEP_MS,
  HOLD_STEP_DECREMENT_MS,
  MIN_HOLD_STEP_MS,
} from '@/config';

const ControlButton = ({ label, onClick, onBlur, disabled }) => {
  const [pressed, setPressed] = useState(false);
  const [intervalMs, setIntervalMs] = useState(DEFAULT_HOLD_STEP_MS);

  useEffect(() => {
    if (!pressed) {
      setIntervalMs(DEFAULT_HOLD_STEP_MS);
      return;
    }

    let id;
    const reserveStep = () =>
      setTimeout(() => {
        onClick();

        if (intervalMs === MIN_HOLD_STEP_MS) {
          id = reserveStep();
          return;
        }

        setIntervalMs((val) => val - HOLD_STEP_DECREMENT_MS);
      }, intervalMs);

    id = reserveStep();
    return () => clearTimeout(id);
  }, [pressed, onClick, intervalMs]);

  return (
    <button
      className="flex size-12 items-center justify-center rounded-md border-2 border-primary bg-primary text-3xl font-light text-white hover:bg-white hover:text-primary disabled:pointer-events-none disabled:opacity-30"
      onClick={onClick}
      onTouchStart={() => setPressed(true)}
      onMouseDown={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onMouseUp={() => setPressed(false)}
      onBlur={onBlur}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ControlButton;
