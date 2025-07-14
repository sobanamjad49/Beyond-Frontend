import React, { useEffect } from "react";

const VoucherCodes = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Voucher / Discount Codes
      </h1>

      {/* Q1 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          How can I use a discount code?
        </h2>
        <p className="text-gray-700">
          Discount or voucher codes should be entered on the checkout page. Once
          applied, your total will reflect the discount. Please note:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          <li>Vouchers have an expiry date and cannot be renewed once expired.</li>
          <li>They cannot be used during sales or promotional campaigns.</li>
        </ul>
      </div>

      {/* Q2 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          If I have a code, is the discount applied automatically?
        </h2>
        <p className="text-gray-700">
          No. Codes must be entered manually at checkout and are not applied
          automatically.
        </p>
      </div>

      {/* Q3 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          How can I find out when the next promotion on beyondeast.com will be?
        </h2>
        <p className="text-gray-700">
          We recommend signing up for our newsletter. You can also follow us on{" "}
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Facebook
          </a>{" "}
          and{" "}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 underline"
          >
            Instagram
          </a>{" "}
          to stay updated on offers and discounts.
        </p>
      </div>

      {/* Q4 */}
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Can I exchange an item that I bought during a promotion?
        </h2>
        <p className="text-gray-700 mb-2">
          Items purchased during a promotion are generally non-exchangeable
          unless there is a valid reason, such as:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Wrong size</li>
          <li>Damaged article</li>
          <li>Incomplete package</li>
          <li>Different article received</li>
        </ul>
      </div>
    </div>
  );
};

export default VoucherCodes;
