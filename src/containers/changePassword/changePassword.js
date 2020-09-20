import React from "react";
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import changePasswordSchema from "../../validation/changePasswordSchema";
import actions from "../../redux/auth/actions";
import { Formik, Form, Field } from "formik";

import "antd/dist/antd.css";

function ChangePassword({ history }) {
  const dispatch = useDispatch();
  const handleChangePass = (values) => dispatch(actions.changePassword(values, history));
  return (
    <div>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={changePasswordSchema}
        onSubmit={(values) => {
          // same shape as initial values
          delete values.confirmPassword;
          values.token = localStorage.getItem("user_token");
          console.log(values);
          handleChangePass(values, history);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label for="password">New Password</label>
            <Field type="password" name="password" as={Input} />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <br />
            <br />
            <label for="confirmPassword">Confirm Password</label>
            <Field type="password" name="confirmPassword" as={Input} />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChangePassword;
