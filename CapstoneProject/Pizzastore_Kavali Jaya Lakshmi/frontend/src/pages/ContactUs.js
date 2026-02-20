import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function Contact() {

  //Validation Schema
  const validationSchema = Yup.object({

    name: Yup.string()
      .min(3, "Too short")
      .required("Name required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email required"),

    message: Yup.string()
      .min(10, "Minimum 10 characters")
      .required("Message required"),

  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    toast.success(
      "Helpdesk request submitted "
    );

    resetForm();
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">
        Contact Helpdesk
      </h2>

      <div className="card shadow p-4">

        <Formik
          initialValues={{
            name: "",
            email: "",
            message: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >

          <Form>
            {/*Name*/}
            <div className="mb-3">
              <label className="form-label">
                Name
              </label>

              <Field
                name="name"
                type="text"
                className="form-control"/>
              <div className="text-danger small">
                <ErrorMessage name="name" />
              </div>
            </div>

            {/* Email*/}
            <div className="mb-3">
              <label className="form-label">
                Email
              </label>

              <Field
                name="email"
                type="email"
                className="form-control"/>
              <div className="text-danger small">
                <ErrorMessage name="email" />
              </div>
            </div>

            {/*Message*/}
            <div className="mb-3">
              <label className="form-label">
                Message
              </label>

              <Field
                as="textarea"
                name="message"
                rows="4"
                className="form-control"/>

              <div className="text-danger small">
                <ErrorMessage name="message" />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-danger"
            >
              Submit Request
            </button>

          </Form>
        </Formik>
      </div>
    </div>
  );
}