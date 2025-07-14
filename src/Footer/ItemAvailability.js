import React, { useEffect } from "react";

const ItemAvailability = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Item Availability</h1>

      {/* Question 1 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          How to check an item’s availability?
        </h2>
        <p className="text-gray-700">
          To check an item’s online availability, enter the item code in the website search bar or search the item by name.
        </p>
      </div>

      {/* Question 2 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          What if I don't have the item code?
        </h2>
        <p className="text-gray-700">
          You can send us an image of that product via email or inbox us on our social media. However, we suggest browsing through our website — you can often find the names of the articles uploaded onto our social media pages.
        </p>
      </div>

      {/* Question 3 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Are items from previous collections available?
        </h2>
        <p className="text-gray-700">
          Only items from the current season are available.
        </p>
      </div>

      {/* Question 4 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          How can I find a size chart?
        </h2>
        <p className="text-gray-700">
          Our size chart is available next to the product details section tab.
        </p>
      </div>

      {/* Question 5 */}
      <div>
        <h2 className="text-xl font-semibold mb-2">
          I want to know about aftercare for products.
        </h2>
        <p className="text-gray-700">
          Details for each article are mentioned on their respective tags, packaging, in-lays, or product pages. For further assistance, feel free to contact us at{" "}
          <a href="mailto:info@beyondeast.com.pk" className="text-blue-600 underline">
            info@beyondeast.com.pk
          </a>.
        </p>
      </div>
    </div>
  );
};

export default ItemAvailability;
