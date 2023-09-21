import React, { useState, Fragment, FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./../App.module.css";

const validationSchema = Yup.object({
  name: Yup.string().required("Required").max(10),
  email: Yup.string().email("Invalid email format").required("Required"),
});

const Forum: FC = () => {
  return (
    <div>
      <h1>My Forum</h1>
      <Formik
        initialValues={{
          validateOnMount: true,
          name: "",
          email: "",
          isTall: false,
          cookies: [],
          yoghurt: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          console.log(` submit ${data}`);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <div>
              <Field type="input" name="name" />
              <ErrorMessage
                className={styles.error}
                name="name"
                component="div"
              />
            </div>
            <br />
            <div>
              <Field type="email" name="email" />
              <ErrorMessage
                className={styles.error}
                name="email"
                component="div"
              />
            </div>
            <br />
            <div>
              <Field name="isTall" type="checkbox" />
            </div>
            <br />
            <div>CheckBox</div>
            <div>
              <Field name="cookies" value="chocolate chip" type="checkbox" />
              <Field name="cookies" value="sugar" type="checkbox" />
              <Field name="cookies" value="lays" type="checkbox" />
              <Field name="cookies" value="coca" type="checkbox" />
            </div>
            <div>
              <Field name="yoghurt" value="peach" type="radio" />
              <Field name="yoghurt" value="blueberry" type="radio" />
              <Field name="yoghurt" value="apple" type="radio" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <div>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Forum;
