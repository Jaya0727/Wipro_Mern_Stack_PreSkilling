import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    // ✅ Centered on all screens
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* ✅ Responsive container */}
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded shadow">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email")
              .required("Required"),
            password: Yup.string()
              .min(6, "Minimum 6 characters")
              .required("Required"),
          })}
          onSubmit={(values) => {
            login(values.email);
            navigate("/cart");
          }}
        >
          <Form className="flex flex-col gap-4">
            {/* EMAIL */}
            <Field
              name="email"
              placeholder="Email"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />

            {/* PASSWORD */}
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />

            {/* SUBMIT */}
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded
                         hover:bg-blue-700 transition"
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;