import {
  CheckInput,
  DateInput,
  RadioInput,
  RangeInput,
  TextInput,
} from "./field-mapping";
const componentMapping = {
  TEXT_FIELD: TextInput,
  RADIO_BUTTON: RadioInput,
  DATE_PICKER: DateInput,
  SLIDER: RangeInput,
  CHECKBOX: CheckInput,
};
const Field = (field) => {
  const Component = componentMapping[field.component];
  return (
    <>
      <Component {...field} />
      {field.error[field.name] && (
        <p style={{ color: "red", margin: 0 }}>{field.error[field.name]}</p>
      )}
    </>
  );
};

export default Field;
