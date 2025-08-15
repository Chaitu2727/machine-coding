import React from "react";

const TextInput = ({ name, label, isRequired, type, onChange, value }) => (
  <div>
    <label htmlFor={name}>
      {label}
      {isRequired && <span>*</span>}
    </label>

    <input
      type={type}
      id={name}
      value={value || ""}
      onChange={(e) => onChange(name, e.target.value)}
    />
  </div>
);

const RadioInput = ({
  name,
  label,
  isRequired,
  type,
  options,
  value,
  onChange,
}) => (
  <div>
    <label>
      {label}
      {isRequired && <span>*</span>}
    </label>
    {options.map((option, index) => (
      <React.Fragment key={index}>
        <input
          type={type}
          id={option}
          value={option || ""}
          checked={value === option}
          onChange={(e) => onChange(name, e.target.value)}
        />
        <label htmlFor={option}>{option}</label>
      </React.Fragment>
    ))}
  </div>
);

const DateInput = ({ name, label, isRequired, type, value, onChange }) => (
  <div>
    <label htmlFor={name}>
      {label}
      {isRequired && <span>*</span>}
    </label>

    <input
      type={type}
      id={name}
      value={value || ""}
      onChange={(e) => onChange(name, e.target.value)}
    />
  </div>
);

const RangeInput = ({
  name,
  label,
  isRequired,
  type,
  minValue,
  maxValue,
  value,
  onChange,
}) => (
  <div>
    <label htmlFor={name}>
      {label}
      {isRequired && <span>*</span>}
    </label>

    <input
      type={type}
      id={name}
      min={minValue}
      max={maxValue}
      value={value || "1"}
      onChange={(e) => onChange(name, e.target.value)}
    />
  </div>
);

const CheckInput = ({ name, label, isRequired, type, value, onChange }) => (
  <div>
    <input
      type={type}
      id={name}
      checked={value || false}
      onChange={(e) => onChange(name, e.target.checked)}
    />
    <label htmlFor={name}>
      {isRequired && <span>*</span>}
      {label}
    </label>
  </div>
);
export { TextInput, RadioInput, DateInput, RangeInput, CheckInput };
