import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Input, Button, Checkbox } from "antd";
import { Formik, Form, Field } from "formik";
import actions from "../../redux/auth/actions";
import loginSchema from "../../validation/loginSchema";
import "antd/dist/antd.css";

function LoginForm({ history }) {
  const dispatch = useDispatch();

  const handleSubmit = (payload) => {
    dispatch(actions.login(payload, history));
  };
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          remember_me: true,
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          console.log(values);
          if (values.remember_me) {
            localStorage.setItem("remember_me", values.remember_me);
          }
          delete values.remember_me;
          // deleting remember me to make data exactly like we want payload in api call
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field placeholder="Email" name="email" as={Input} />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              placeholder="Password"
              name="password"
              as={Input}
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <Link to="forgotPassword"> Forgot Password ? </Link>

            <br />
            <br />
            <Field name="remember_me" type="checkbox" as={Checkbox} />
            <label htmlFor="remember_me"> Remember Me</label>
            <br />
            <br />
            <Button htmlType="submit" type="primary" loading={false}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <br />
      <br />
    </div>
  );
}

export default LoginForm;
