import React, { useEffect } from "react";

const HowToOrder = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white px-6 md:px-20 py-10 text-gray-800">
      <h1 className="text-4xl font-extrabold mb-6 text-center">HOW TO PLACE AN ORDER?</h1>

      <div className="max-w-3xl mx-auto space-y-6 text-sm md:text-base">
        <Step number="1" text="Click on the ‘Add to Cart’ option for desired items." />
        <Step number="2" text="Click on the cart icon or ‘Proceed to Checkout’ and fill in contact information. Continue to the ‘Shipping’ step." />
        <Step number="3" text="Fill in the ‘Billing Details’ section with accurate information." />
        <Step number="4" text="Choose your preferred payment mode:" />
        <ul className="list-disc list-inside pl-4 text-gray-700">
          <li>Cash on Delivery (COD)</li>
          <li>Debit/Credit Card <span className="text-gray-500 italic">(Coming Soon)</span></li>
          <li>Electronic Fund Transfer (EFT)</li>
        </ul>
        <Step number="5" text="Click on ‘Complete Your Order’. Your order will now be placed." />
        <Step number="6" text="The order number will be displayed on the screen. Kindly take a screenshot for reference or support." />
      </div>
    </div>
  );
};

const Step = ({ number, text }) => (
  <div className="flex items-start gap-3">
    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold mt-1">{number}</div>
    <p className="text-gray-700">{text}</p>
  </div>
);

export default HowToOrder;
