import React, { useEffect } from 'react'

function RefundPolicy() {
    useEffect(()=>{
        window.scrollTo(0,0)
    });
  return (
    <div>
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
  <div className="max-w-3xl w-full">
    <h2 className="text-2xl font-semibold mb-6 text-center">Refund Policy</h2>

    <p className="mb-4 text-gray-800">
      We have a 14-day exchange policy, which means you have 14 days after receiving your item to request an exchange.
    </p>

    <p className="mb-4 text-gray-800">
      To be eligible for an exchange, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
    </p>

    <p className="mb-4 text-gray-800">
      To start an exchange, you can contact us at <strong>WhatsApp 0309-3331318</strong> or <strong>Email info@beyondeast.com.pk</strong>. If your exchange is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting an exchange will not be accepted.
    </p>

    <p className="mb-4 text-gray-800">
      You can always contact us for any exchange question at <strong>WhatsApp 0309-3331318</strong> or <strong>Email info@beyondeast.com.pk</strong>.
    </p>

    <h3 className="text-lg font-semibold mt-8 mb-2">Damages and issues</h3>
    <p className="mb-4 text-gray-800">
      Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
    </p>

    <h3 className="text-lg font-semibold mt-8 mb-2">Exceptions / non-exchangeable items</h3>
    <p className="mb-4 text-gray-800">
      Certain types of items cannot be exchanged, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept exchanges for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.
    </p>
    <p className="mb-4 text-gray-800">
      Unfortunately, we cannot accept exchanges on sale items or gift cards.
    </p>

    <h3 className="text-lg font-semibold mt-8 mb-2">Exchanges</h3>
    <p className="text-gray-800">
      The fastest way to ensure you get what you want is to exchange the item you have, and once the exchange is accepted, make a separate purchase for the new item.
    </p>
  </div>
</div>

    </div>
  )
}

export default RefundPolicy
