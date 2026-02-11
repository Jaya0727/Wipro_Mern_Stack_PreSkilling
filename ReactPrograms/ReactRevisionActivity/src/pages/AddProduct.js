import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

const schema = Yup.object({
  name: Yup.string().required("Product name required"),
  price: Yup.number().positive().required("Price required"),
  category: Yup.string().required("Category required"),
});

function AddProduct() {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>

      <Formik
        initialValues={{ name: "", price: "", category: "" }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          })
            .then(res => res.json())
            .then(data => {
              addProduct(data);
              resetForm();
              navigate("/");
            });
        }}
      >
        <Form>
          <div className="mb-3">
            <label>Name</label>
            <Field name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label>Price</label>
            <Field name="price" type="number" className="form-control" />
            <ErrorMessage name="price" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label>Category</label>
            <Field name="category" className="form-control" />
            <ErrorMessage name="category" component="div" className="text-danger" />
          </div>

          <button type="submit" className="btn btn-dark">
            Add Product
          </button>
        </Form>
      </Formik>
    </div>
  );
}
export default AddProduct;
