import { useId } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import css from "./SignUp.module.css";
import { ErrorMessage } from "formik";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const FeedbackSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid email!").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
  repeatPassword: Yup.string().min(6, "Too Short!").required("Required"),
});

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

function SignUp() {
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleSubmit = (values, actions) => {
    if (values.password !== values.repeatPassword) {
      setError("Passwords do not match");
      setSubmitted("");
    } else {
      setError("");
      setSubmitted("Passwords match, form submitted");
      // Here you can handle further form submission, e.g., sending data to the server
      console.log(values);
      actions.resetForm();
    }
  };

  const emailFieldId = useId();
  const passwordFieldId = useId();
  const repeatPasswordFieldId = useId();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.form}>
          <div>
            <label htmlFor={emailFieldId}>Email</label>
            <Field
              className={css.field}
              type="email"
              name="email"
              id={emailFieldId}
            />
            <ErrorMessage name="email" component="span" />
          </div>
          <div>
            <label htmlFor={passwordFieldId}>Password</label>
            <Field
              className={css.field}
              type={showPassword ? "text" : "password"}
              name="password"
              id={passwordFieldId}
            />
            <div onClick={toggleShowPassword}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>

            <ErrorMessage name="password" component="span" />
          </div>
          <div>
            <label htmlFor={repeatPasswordFieldId}>Repeat password</label>
            <Field
              className={css.field}
              type={showRepeatPassword ? "text" : "password"}
              name="repeatPassword"
              id={repeatPasswordFieldId}
            />
            <div onClick={toggleShowRepeatPassword}>
              {showRepeatPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
            <ErrorMessage name="repeatPassword" component="span" />
          </div>
          <button className={css.btn} type="submit">
            Sign Up
          </button>
          {error ? (
            <div style={{ color: "red" }}>{error}</div>
          ) : (
            <div style={{ color: "green" }}>{submitted}</div>
          )}
        </Form>
      </Formik>
      <p>Already have an account? Sing In</p>
    </>
  );
}

export default SignUp;
