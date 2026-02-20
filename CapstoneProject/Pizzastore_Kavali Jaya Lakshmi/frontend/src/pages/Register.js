import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Register() {
  const navigate = useNavigate();
  // Validation
  const validationSchema = Yup.object({

    name: Yup.string()
      .min(3, "Minimum 3 characters")
      .required("Name required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email required"),

    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password required"),
  });

  return (
    <div className="container mt-5 col-md-4">
      <div className="card p-4 shadow rounded-4">
        <h3 className="text-center mb-3">
          Register
        </h3>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const res = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                  method: "POST",
                  headers: {"Content-Type": "application/json",
                 },
                  body: JSON.stringify(values),
                }
              );

              const data = await res.json();
              if (!res.ok) {
                alert(data);
                return;
              }

              alert("Registered Successfully");
              navigate("/login");

            } catch (err) {
              alert("Registration failed");
            }
          }}
        >
          <Form>
            {/*Name*/}
            <Field
              name="name"
              className="form-control mb-1"
              placeholder="Name"
            />
            <small className="text-danger">
              <ErrorMessage name="name" />
            </small>

            {/*Email*/}
            <Field
              name="email"
              type="email"
              className="form-control mb-1 mt-3"
              placeholder="Email"/>
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
              className="btn btn-danger w-100 mt-4">
              Register
            </button>

          </Form>
        </Formik>

      </div>
    </div>
  );
}