import React, { useEffect } from "react";

const EditOrdersInfo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Edit Orders & Info</h1>

      {/* Question 1 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          How can I edit my account login information?
        </h2>
        <p className="text-gray-700">
          To change your login information, please log in using current information.
          In the section <span className="font-medium">"Login details"</span> you can
          change the password and email address linked to your user account.
        </p>
      </div>

      {/* Question 2 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          How can I edit the default delivery address on my user account?
        </h2>
        <p className="text-gray-700">
          Login to your account. In the <span className="font-medium">‘Address Tab’</span>, you
          can add or remove shipping addresses. You can also change the address on the checkout
          page when entering details.
        </p>
      </div>

      {/* Question 3 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Can I modify the delivery method or store for my order?
        </h2>
        <p className="text-gray-700">
          It is not possible to modify the delivery method for a completed order. If it has
          not left the warehouse yet, you may cancel it and make a new purchase with the
          correct delivery method. Be aware that in the meantime some of the items may have sold out.
        </p>
      </div>

      {/* Question 4 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Can I change items in my completed order?
        </h2>
        <p className="text-gray-700">
          Orders can be edited till the confirmation stage. However, once an order is confirmed,
          it cannot be edited.
        </p>
      </div>

      {/* Question 5 */}
      <div>
        <h2 className="text-xl font-semibold mb-2">
          How can I retrieve my disabled account?
        </h2>
        <p className="text-gray-700">
          To retrieve your disabled account, please email us your details at{" "}
          <a href="mailto:info@beyondeast.com.pk" className="text-blue-600 underline">
            info@beyondeast.com.pk
          </a>
          , and a representative will get in touch with you.
        </p>
      </div>
    </div>
  );
};

export default EditOrdersInfo;
