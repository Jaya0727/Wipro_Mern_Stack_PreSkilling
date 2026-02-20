import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddProduct() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      price: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      category: Yup.string().required("Category is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Must be positive"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      resetForm();
      navigate("/");
    },
  });

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h3>Add Product</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              name="name"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.name} />
            {formik.errors.name && (
              <div className="text-danger">{formik.errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label>Category</label>
            <input
              name="category"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.category}/>
            {formik.errors.category && (
              <div className="text-danger">{formik.errors.category}</div>
            )}
          </div>

          <div className="mb-3">
            <label>Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.price} />
            {formik.errors.price && (
              <div className="text-danger">{formik.errors.price}</div>
            )}
          </div>
          <div className="mb-3">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            {formik.errors.description && (
              <div className="text-danger">{formik.errors.description}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddProduct;
