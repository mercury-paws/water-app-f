import css from "./Setting.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useId } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/auth/operations";

Modal.setAppElement("#root");

const FeedbackSchema = Yup.object().shape({
  picked: Yup.string().required("Required"),
  name: Yup.string()
    .min(4, "Too short")
    .max(20, "Too long")
    .required("Required"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
  weight: Yup.number("Must be a valid number!")
    .min(25, "Too short")
    .max(250, "Too long")
    .required("Required"),
  time: Yup.number()
    .min(0, "Must be a valid time from 0 to 24 hours")
    .max(24, "Must be a valid time from 0 to 24 hours")
    .required("Required"),
  howMuch: Yup.number("Must be a valid number!")
    .min(0.5, "Too little")
    .max(5, "Must be a valid time from 0 to 24 hours")
    .required("Required"),
});

const initialValues = {
  picked: "",
  name: "",
  email: "",
  weight: "",
  time: "",
  howMuch: "",
};

function Setting({ isOpen, onRequestClose }) {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const formattedValues = {
      gender: values.picked.toLowerCase(),
      name: values.name,
      email: values.email,
      weight: values.weight,
      sportTime: values.time,
      waterVolume: values.howMuch,
    };
    dispatch(
      updateUser({
        email: values.email,
        formattedValues,
      })
    );
    onRequestClose();
  };

  const pickedWomanFieldId = useId();
  const pickedManFieldId = useId();
  const nameFieldId = useId();
  const emailFieldId = useId();
  const weightFieldId = useId();
  const timeFieldId = useId();
  const howMuchFieldId = useId();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="delete"
      overlayClassName={css.overlay}
      className={css.modalContent}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form>
          <h1>Setting</h1>
          <div id="my-radio-group">Your gender identity</div>
          <div role="group">
            <label htmlFor={pickedWomanFieldId}>
              <Field
                id={pickedWomanFieldId}
                type="radio"
                name="picked"
                value="female"
              />
              Woman
            </label>
            <label htmlFor={pickedManFieldId}>
              <Field
                id={pickedManFieldId}
                type="radio"
                name="picked"
                value="male"
              />
              Man
            </label>
            <ErrorMessage name="picked" component="span" />
          </div>
          <div>
            <label htmlFor={nameFieldId}>Name</label>
            <Field
              className={css.field}
              type="string"
              name="name"
              id={nameFieldId}
            />
            <ErrorMessage name="name" component="span" />
          </div>
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
            <label htmlFor={weightFieldId}>Your weight in kilograms:</label>
            <Field
              className={css.field}
              type="string"
              name="weight"
              id={weightFieldId}
            />
            <ErrorMessage name="weight" component="span" />
          </div>
          <div>
            <label htmlFor={timeFieldId}>
              The time of active participation in sports:
            </label>
            <Field
              className={css.field}
              type="string"
              name="time"
              id={timeFieldId}
            />
            <ErrorMessage name="time" component="span" />
          </div>
          <div>
            <h5>My daily norma</h5>
            <div>For woman:</div>
            <div>V=(M*0,03) + (T*0,4)</div>
            <div>For man:</div>
            <div>V=(M*0,04) + (T*0,6)</div>
            <div>
              <span>*</span> V is the volume of the water norm in liters per
              day, M is your body weight, T is the time of active sports, or
              another type of activity commensurate in terms of loads (in the
              absence of these, you must set 0)
            </div>
            <div>The required amount of water in liters per day:</div>
            <div>
              <label htmlFor={howMuchFieldId}>
                Write down how much water you will drink:
              </label>
              <Field
                className={css.field}
                type="string"
                name="howMuch"
                id={howMuchFieldId}
              />
              <ErrorMessage name="howMuch" component="span" />
            </div>
          </div>
          <button className={css.btn} type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </Modal>
  );
}

export default Setting;
