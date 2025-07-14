import React, { useEffect } from "react";

const PaymentMethods = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Payment Methods
      </h1>

      {/* Question 1 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          What is the mode of payment?
        </h2>
        <p className="text-gray-700">
          The default payment modes are Cash on Delivery, Payment by Card, or
          Electronic Fund Transfer. All active MasterCard and Visa credit and
          debit cards can be used to make payments online.
        </p>
      </div>

      {/* Question 2 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Why was my credit card declined?
        </h2>
        <p className="text-gray-700 mb-2">You might be facing this issue for the following reasons:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Card expired:</strong> Ensure that your card is valid and active.</li>
          <li><strong>Card limit reached:</strong> Check with your bank if you’ve hit your transaction limit.</li>
          <li><strong>Incorrect information:</strong> You may have entered incomplete or incorrect details.</li>
        </ul>
      </div>

      {/* Question 3 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          What if I am charged more than once on my card?
        </h2>
        <p className="text-gray-700">
          Contact your respective bank immediately. You can also reach us at{" "}
          <a
            href="mailto:info@beyondeast.com"
            className="text-blue-600 underline"
          >
            info@beyondeast.com
          </a>
          .
        </p>
      </div>

      {/* Question 4 */}
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Can I place an order and pick it up from the store?
        </h2>
        <p className="text-gray-700">
          It is not possible to place an order for store pickup at the moment.
        </p>
      </div>
    </div>
  );
};

export default PaymentMethods;
