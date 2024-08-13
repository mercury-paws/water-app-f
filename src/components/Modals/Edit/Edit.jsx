import css from "./Edit.module.css";
import { FaPlus } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useId, useState } from "react";

const FeedbackSchema = Yup.object().shape({
  time: Yup.string()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Must be a valid time in the format HH:MM"
    )
    .required("Required"),
  value: Yup.string()
    .min(0, "Too Small!")
    .max(2000, "Too Much!")
    .required("Required"),
});

function Edit() {
  const [value, setValue] = useState(50);

  const initialValues = {
    time: `07:00`, // time must be the one in database
    value: value,
  };

  const timeFieldId = useId();
  const valueFieldId = useId();

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  let difference = Number(50);

  const decreaseValue = () => {
    let decreasedValue = value - difference;
    setValue(decreasedValue);
  };

  const addValue = () => {
    let addedValue = value + difference;
    setValue(addedValue);
  };

  return (
    <div>
      <h4 className={css.header}>Edit the entered amount of water</h4>
      <p className={css.doSmth}>Correct entered data:</p>
      <p className={css.amount}>Amount of water:</p>
      <div className={css.addWaterBlock}>
        {<FaMinusCircle className={css.minus} onClick={decreaseValue} />}
        <p className={css.ml}>50 ml</p>
        {<FaPlusCircle className={css.plus} onClick={addValue} />}
      </div>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.form}>
          <div className={css.timeBlock}>
            <label className={css.time} htmlFor={timeFieldId}>
              Recording time:
            </label>
            <Field
              className={css.field}
              type="text"
              name="time"
              id={timeFieldId}
            />

            <ErrorMessage className={css.error} name="time" component="span" />
          </div>
          <div className={css.valueBlock}>
            <label htmlFor={valueFieldId} className={css.value}>
              Enter the value of the water used:
            </label>
            <Field
              className={css.field}
              type="text"
              name="value"
              id={valueFieldId}
              value={value}
            />

            <ErrorMessage className={css.error} name="value" component="span" />
          </div>
          <button className={css.btn} type="submit">
            Save
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Edit;