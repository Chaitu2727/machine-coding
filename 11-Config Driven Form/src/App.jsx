import Form from "./components/Form";
import * as yup from "yup";
import "./App.css";

const schema = [
  {
    component: "TEXT_FIELD",
    name: "name",
    label: "Your Name",
    isRequired: true,
    validate: yup.string().required("Name is required"),
    type: "text",
  },
  {
    component: "TEXT_FIELD",
    name: "email",
    label: "Your Email",
    isRequired: true,
    validate: yup
      .string()
      .email("Please enter valid Email")
      .required("Email is required"),
    type: "email",
  },
  {
    component: "TEXT_FIELD",
    name: "password",
    label: "Your Password",
    isRequired: true,
    validate: yup
      .string()
      .required("Password is required")
      .min(8, "The password should be 8 characters"),
    type: "password",
  },
  {
    component: "TEXT_FIELD",
    name: "confirmPassword",
    label: "Re enter Password",
    isRequired: true,
    validate: yup
      .string()
      .oneOf([yup.ref("password")], "Password should match")
      .required("Comfirm Password is required"),
    type: "password",
  },
  {
    component: "RADIO_BUTTON",
    name: "gender",
    label: "Gender",
    isRequired: true,
    options: ["Male", "Female", "Others"],
    validate: yup.string().required("Gender is required"),
    type: "radio",
  },
  {
    component: "DATE_PICKER",
    name: "date",
    label: "Date of Birth",
    validate: yup.date(),
    type: "date",
  },
  {
    component: "SLIDER",
    name: "rating",
    label: "Rating",
    minValue: 1,
    maxValue: 5,
    validate: yup
      .number()
      .min(1, "Rating must be atleast 1")
      .max(5, "Rating must be lessthan 5"),
    type: "range",
  },
  {
    component: "CHECKBOX",
    name: "accept_terms",
    label: "I accept the terms and conditions",
    isRequired: true,
    validate: yup
      .bool()
      .oneOf([true], "You must accept the terms and conditions ")
      .required("Please accept the terms and condition"),
    type: "checkbox",
  },
];

function App() {
  const submitHandler = (formData) => {
    console.log("Form submitted", formData);
  };
  return (
    <div className="app">
      <h1>Config Driven From</h1>
      <Form schema={schema} onSubmit={submitHandler} />
    </div>
  );
}

export default App;
