export default function Footer() {
  return (
    <footer className="footer bg-dark text-white pt-2 pb-1">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">
              Pizzeriaa
            </h5>

            <p className="small text-light">
              Order delicious pizzas on the go, anywhere,
              anytime. Hot & fresh delivery at your doorstep.
            </p>

          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">
              Order Now
            </h6>

            <ul className="footer-links">
              <li>Pizza</li>
              <li>Sides</li>
              <li>Beverages</li>
              <li>Best Sellers</li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">
              Help & Support
            </h6>

            <p className="small text-light mb-1">
              Email: support@pizzeriaa.com
            </p>

            <p className="small text-light">
              Phone: +91 9989258087
            </p>

           <div className="d-flex gap-3 mb-2">
                <a href="/about" className="text-light text-decoration-none small"> About Us</a>
                <a href="/contact" className="text-light text-decoration-none small">Contact Helpdesk</a>
            </div>
            <button className="btn btn-outline-light btn-sm mt-2">
              Give Feedback
            </button>
          </div>
        </div>
        <hr className="border-secondary" />

        <div className="text-center small text-secondary">
          2026 Pizzeriaa. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}