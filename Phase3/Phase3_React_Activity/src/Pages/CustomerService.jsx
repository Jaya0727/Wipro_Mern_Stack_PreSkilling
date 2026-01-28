import PageTransition from "../transitions/PageTransition";
const CustomerService = () => {
  return (
    <PageTransition>
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Customer Service</h1>

      <p className="text-gray-700 mb-6">
        We’re here to help you. Please choose an option below.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border p-4 rounded shadow">
          <h3 className="font-semibold">Order Issues</h3>
          <p className="text-sm text-gray-600">
            Track orders, returns, or refunds.
          </p>
        </div>

        <div className="border p-4 rounded shadow">
          <h3 className="font-semibold">Payment Support</h3>
          <p className="text-sm text-gray-600">
            Payment failures or billing queries.
          </p>
        </div>

        <div className="border p-4 rounded shadow">
          <h3 className="font-semibold">Account Help</h3>
          <p className="text-sm text-gray-600">
            Login, password, or profile issues.
          </p>
        </div>

        <div className="border p-4 rounded shadow">
          <h3 className="font-semibold">Contact Us</h3>
          <p className="text-sm text-gray-600">
            Email: support@eflyer.com
          </p>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default CustomerService;