import { Field, Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegistrationSchema } from "../validation/validation";
import { api } from "../api/axios";
import { toast } from "react-toastify";
import { publicLinks, urls } from "../constants/links";

const Register = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="container d-flex flex-column align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center mt-3 mb-3">
          <h1 className="fw-bold">Get Started</h1>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Formik
            initialValues={{
              email: "",
              username: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={RegistrationSchema}
            onSubmit={async (values) => {
              try {
                await api.post(urls.REGISTER, values);
                toast.success("Account created successfully!");
                navigate(publicLinks.Login);
              } catch (error) {
                toast.error("Account Creation failed");
                // TODO:Add axios error messages
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="border rounded px-3 shadow-lg">
                {/* email */}
                <div className="mb-3 mt-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field type="email" className="form-control" name="email" />
                  {touched?.email && errors?.email && (
                    <div className="text-danger fst-italic fs-6">
                      {errors.email}
                    </div>
                  )}
                </div>
                {/* end of email */}

                {/* username */}
                <div className="mb-3 mt-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <Field className="form-control" name="username" />
                  {touched.username && errors.username && (
                    <div className="text-danger fst-italic fs-6">
                      {errors.username}
                    </div>
                  )}
                </div>
                {/* end of username */}

                {/* password & confirm password */}
                <div className="row mb-3">
                  <div className="col-md-6 col-sm-12">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Field
                      className="form-control"
                      name="password"
                      type="password"
                    />
                    {touched.password && errors.password && (
                      <div className="text-danger fst-italic fs-6">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <Field
                      className="form-control"
                      name="confirmPassword"
                      type="password"
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <div className="text-danger fst-italic fs-6">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div>
                {/* end of password */}

                <div className="mb-3">
                  <button
                    style={{ backgroundColor: "#245549" }}
                    className="btn w-100 border-0 text-white fw-semibold"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>

                <div className="mb-3 text-center">
                  <Link className="fst-italic" to={publicLinks.Login}>
                    Already have an account
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Register;
