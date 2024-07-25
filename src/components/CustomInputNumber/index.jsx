import { useEffect, useRef, useState } from 'react';
import ControlButton from './ControlButton';

const CustomInputNumber = ({
  name,
  value: initialValue,
  max,
  min = 0,
  step = 1,
  onChange,
  onBlur,
  disabled,
}) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => setValue(initialValue), [initialValue]);

  const ref = useRef();
  const inputRef = useRef();

  const getHandleClick = (offset) => () => {
    const newValue = value + offset;
    handleChange({ target: { name, value: newValue } });
    inputRef.current.dispatchEvent(
      new Event('input', {
        bubbles: true,
      })
    );
  };

  const handleChange = (e) => {
    const {
      target: { value: _value },
    } = e;
    const newValue = +_value;
    if (newValue < min || newValue > max) return;

    setValue(newValue);
    inputRef.current.value = newValue;

    if (!onChange) return;
    onChange(e);
  };

  const handleBlur = (e) => {
    if (!onBlur || ref.current.contains(e.relatedTarget)) return;

    onBlur(e);
    e.stopPropagation();
  };

  return (
    <div
      className="flex gap-2 rounded-md bg-white text-base text-black"
      tabIndex={0}
      onBlur={handleBlur}
      ref={ref}
    >
      <ControlButton
        label="-"
        onClick={getHandleClick(-step)}
        onBlur={handleBlur}
        disabled={disabled || value <= min}
      />
      <input
        className="size-12 rounded-md bg-secondary text-center disabled:opacity-30"
        type="number"
        name={name}
        value={value}
        max={max}
        min={min}
        step={step}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        ref={inputRef}
      ></input>
      <ControlButton
        label="+"
        onClick={getHandleClick(step)}
        onBlur={handleBlur}
        disabled={disabled || value >= max}
      />
    </div>
  );
};

export default CustomInputNumber;
