import React from "react";
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import emailSchema from "../../validation/emailSchema";
import actions from "../../redux/auth/actions";
import { Formik, Form, Field } from "formik";

import "antd/dist/antd.css";

function ForgotPassword() {
  const dispatch = useDispatch();
  const handleForgotPass = (values) =>
    dispatch(actions.forgotPassword(values));
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={emailSchema}
        onSubmit={(values) => {
          // same shape as initial values
          handleForgotPass(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label for="email">Email</label>
            <Field name="email" as={Input} />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <br />
            <br />
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ForgotPassword;
