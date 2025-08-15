import { useState } from "react";
import Field from "./Field";
import * as yup from "yup";

const Form = ({ schema = [], onSubmit = () => {} }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const validateSchema = yup.object().shape(
    schema.reduce((acc, field) => {
      if (field.validate) {
        acc[field.name] = field.validate;
      }
      return acc;
    }, {})
  );

  const changeHandler = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await validateSchema.validate(formData, { abortEarly: false });
      onSubmit(formData);
      setFormData({});
    } catch (err) {
      const validationErrors = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      setErrors(validationErrors);
    }
  };
  return (
    <form onSubmit={submitHandler}>
      {schema.map((field, index) => (
        <Field
          key={index}
          {...field}
          onChange={changeHandler}
          error={errors}
          value={formData[field?.name] || ""}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
