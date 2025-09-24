import type { RadioButtonProps } from '../types';
const RadioButton = ({
  name,
  button,
  currentValue,
  onChange,
}: RadioButtonProps) => {
  return (
      <label>
        {button}
        <input
          type='radio'
          name={name}
          value={button}
          checked={button === currentValue}
          onChange={() => onChange(button)}
        />
      </label>
  );
};

export default RadioButton;
