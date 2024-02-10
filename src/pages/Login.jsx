import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import { Field, Form, Formik } from "formik";
import { LoginSchema } from "../validation/validation";
import { toast } from "react-toastify";
import { privateLinks, publicLinks } from "../constants/links";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  return (
    <>
      <div
        className="container d-flex flex-column align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center mt-3 mb-3">
          <h4 className="fw-bold">Welcome Back</h4>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              try {
                await loginUser(values);
                toast.success("Karibu Tena");
                navigate(privateLinks?.Dashboard);
              } catch (error) {
                toast.error("Incorrect email or password");
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

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Field
                    type="password"
                    className="form-control"
                    name="password"
                  />
                  {touched?.password && errors?.password && (
                    <div className="text-danger fst-italic fs-6">
                      {errors.password}
                    </div>
                  )}
                </div>
                {/* end password */}

                <div className="mb-3">
                  <button
                    style={{ backgroundColor: "#245549" }}
                    className="btn w-100 border-0 text-white fw-semibold"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>

                <div className="mb-3 text-center">
                  <Link className="fst-italic" to={publicLinks.Register}>
                    Create an account
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

export default Login;
