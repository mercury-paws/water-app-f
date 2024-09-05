import { useId } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import css from "./SignIn.module.css";
import { ErrorMessage } from "formik";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import toast, { Toaster } from "react-hot-toast";
// import MainPic from "../../components/StartPageComponents/MainPic/MainPic";

const FeedbackSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid email!").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

const initialValues = {
  email: "",
  password: "",
};

function SignIn() {
  {
    /* <Toaster/> */
  }
  const [showPassword, setShowPassword] = useState(false);
  let dispatch = useDispatch();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then((data) => {
        toast.success("Success!");
        actions.resetForm();
      })
      .catch((error) => {
        toast.error("Login failed: " + error.message);
        console.error("Login failed:", error);
        // actions.resetForm();
      });
    // actions.resetForm();
  };

  const emailFieldId = useId();
  const passwordFieldId = useId();

  return (
    <div className={css.signInForm}>
      <h2 className={css.signIn}>Sign In</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.form}>
          <div>
            <label htmlFor={emailFieldId} className={css.label}>
              Email
            </label>
            <Field
              className={css.field}
              type="email"
              name="email"
              id={emailFieldId}
            />

            <ErrorMessage name="email" component="span" />
          </div>
          <div className={css.passField}>
            <label htmlFor={passwordFieldId} className={css.label}>
              Password
            </label>
            <Field
              className={css.field}
              type={showPassword ? "text" : "password"}
              name="password"
              id={passwordFieldId}
            />
            <div onClick={toggleShowPassword}>
              {showPassword ? (
                <FaEye className={css.faIcon} />
              ) : (
                <FaEyeSlash className={css.faIcon} />
              )}
            </div>
            <ErrorMessage name="password" component="span" />
          </div>
          <button className={css.btn} type="submit">
            Sign In
          </button>
          <Toaster />
        </Form>
      </Formik>
      <p className={css.offer}>
        Don't have an account?{" "}
        <NavLink to="/signup" className={css.signUp}>
          Sing Up
        </NavLink>{" "}
      </p>
    </div>
  );
}

export default SignIn;
