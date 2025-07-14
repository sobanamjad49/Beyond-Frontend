import React, { useEffect } from 'react'

function ShippingDelivery() {
       useEffect(()=>{
            window.scrollTo(0,0)
        });
  return (
    <div>
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
  <div className="max-w-3xl w-full">
    <h2 className="text-2xl font-semibold mb-6 text-center">Shipping & Return</h2>

    <h3 className="text-lg font-semibold mt-6 mb-2">Nationwide Delivery</h3>
    <ul className="list-disc pl-5 mb-4 text-gray-800 space-y-2">
      <li>Beyond East currently delivers nationwide to all private (home, office, etc.) addresses. However, we do not ship to any Beyond East stores.</li>
      <li>All nationwide orders will be delivered within 3–5 working days.</li>
      <li>Flat shipping charges of Rs.180 will be charged on all orders below Rs.7,000.</li>
      <li>Free shipping can be availed on all nationwide orders above Rs.7,000.</li>
      <li>On the delivery date, an SMS from the courier company will be sent to you. In case of unavailability, please have somebody designated to receive the parcel on your behalf.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-6 mb-2">International Delivery</h3>
    <ul className="list-disc pl-5 mb-4 text-gray-800 space-y-2">
      <li>All International orders will be delivered at original invoice.</li>
      <li>For all international orders, shipping charges will be calculated depending on the customer's location (City, Country, etc.).</li>
      <li>Customers will bear custom duties on international orders.</li>
      <li>All international orders will be delivered within 7–10 working days.</li>
    </ul>

    <h3 className="text-lg font-semibold mt-6 mb-2">Exchanges & Returns</h3>
    <ul className="list-disc pl-5 mb-4 text-gray-800 space-y-2">
      <li>Beyond East has a <strong>NO REFUND</strong> policy.</li>
      <li>All products purchased from <strong>www.beyondeast.com</strong> can be exchanged if they are in their original state (packaging/tags/motifs/embroideries intact) and with the original receipt.</li>
      <li>Accessories are non-exchangeable.</li>
      <li>
        To exchange an article, email your order number, images of the product, and reason for exchange to <strong>info@beyondeast.com</strong>, or contact us on social media within 14 days of purchase.
      </li>
      <li><strong>NO EXCHANGE POLICY</strong> for sale/discounted items unless:</li>
      <ul className="list-[circle] pl-6 space-y-1">
        <li>Wrong size</li>
        <li>Damaged/defected article</li>
        <li>Incomplete package</li>
        <li>Different article</li>
      </ul>
      <li>Items damaged after use are not covered under the exchange policy.</li>
      <li>Exchange will be processed after receiving and assessing the returned product. This may take up to 14 working days.</li>
      <li>
        Articles can be exchanged for items of the same price. If a customer received a damaged item, they can request a reshipment or a voucher of equivalent value. Notification will be sent via email.
      </li>
    </ul>
  </div>
</div>

    </div>
  )
}

export default ShippingDelivery
