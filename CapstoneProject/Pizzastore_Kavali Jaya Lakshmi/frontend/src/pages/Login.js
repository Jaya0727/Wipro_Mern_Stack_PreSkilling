import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Login() {
  const navigate = useNavigate();
  
  // Validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email required"),

    password: Yup.string()
      .required("Password required"),
  });

  return (
    <div className="container mt-5 col-md-4">
      <div className="card p-4 shadow rounded-4">
        <h3 className="text-center mb-3">
          Sign In
        </h3>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}

          onSubmit={async (values) => {
            try {
              const res = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                }
              );

              const data = await res.json();

              if (!res.ok) {
                alert("Invalid credentials");
                return;
              }
              // Store token & user
              localStorage.setItem(
                "token",
                data.token
              );
              localStorage.setItem(
                "user",
                JSON.stringify(data.user)
              );

              // Role redirect
              if (data.user.role === "admin") {
                navigate("/admin");
              } else {
                navigate("/");
              }

            } catch (err) {
              alert("Login failed");
            }
          }}
        >
          <Form>
            {/*Email*/}
            <Field
              name="email"
              className="form-control mb-1"
              placeholder="Email"
            />
            <small className="text-danger">
              <ErrorMessage name="email" />
            </small>

            {/*Password*/}
            <Field
              name="password"
              type="password"
              className="form-control mb-1 mt-3"
              placeholder="Password"/>
            <small className="text-danger">
              <ErrorMessage name="password" />
            </small>

            <button
              type="submit"
              className="btn btn-dark w-100 mb-3 mt-4">
              Login
            </button>

          </Form>
        </Formik>

        {/* Register Link */}
        <p className="text-center mb-0">
          Don't have an account?{" "}
          <Link to="/register">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}