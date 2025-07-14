import React, { useState } from "react";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // same index clicked = close
    } else {
      setOpenIndex(index); // open new index
    }
  };

  const faqData = [
    {
      question: "INFORMATION",
      answer: [
        <Link to="/About" key="about" className="text-sm">
          About Us
        </Link>,

        <Link to="/StoreLocator" key="terms" className="text-sm">
        StoreLocator
        </Link>,

        <Link to="/RefundPolicy" key="refund" className="text-sm">
          Refund Policy
        </Link>,

        <Link to="/OrdersReturns" key="orders" className="text-sm">
          Orders & Returns
        </Link>,

        <Link to="/ShippingDelivery" key="shipping" className="text-sm">
          Shipping & Delivery
        </Link>,

        <Link to="/Terms" key="blogs" className="text-sm">
        Terms
        </Link>,
      ],
    },
    {
      question: "CUSTOMER SERVICE",
      answer: [
        <Link to="/HowToPlaceOrder" key="order" className="text-sm">
          How to place an order
        </Link>,

        <Link to="/EditOrders" key="edit" className="text-sm">
          Edit Orders
        </Link>,

        <Link to="/ItemAvailability" key="availability" className="text-sm">
          Item Availability
        </Link>,
        <Link to="/PaymentMethods" key="payment" className="text-sm">
          Payment Methods
        </Link>,

        <Link to="/ShippingDelivery" key="shipping" className="text-sm">
          Shipping & Delivery
        </Link>,

        <Link to="/VoucherCodes" key="voucher" className="text-sm">
          Voucher Codes
        </Link>,
      ],
    },

    {
      question: "CONTACT US",
      answer: [
        <p> Phone : +03134183635</p>,

        <p> Whatsapp : +03134183635</p>,

        <p>Email : info@beyondeast.com</p>,
      ],
    },
  ];

  return (
    <div>
      {/* ==================== DESKTOP VIEW ==================== */}
      <div className="hidden sm:block">
        <div className="flex flex-wrap justify-between bg-[#424242]">
          {/* INFORMATION */}
          <div className=" md:w-[30%] lg:w-[18%]  px-6 py-10">
           
            <div>
              <p className="text-white text-sm font-semibold mb-2">
                INFORMATION
              </p>

              <Link to="/About">
                <p className="text-white text-sm mb-3 hover:underline">
                  About Us
                </p>
              </Link>

              <Link to="/StoreLocator">
                <p className="text-white text-sm mb-3 hover:underline">
                 StoreLocator
                </p>
              </Link>

              <Link to="/RefundPolicy">
                <p className="text-white text-sm mb-3 hover:underline">
                  Refund Policy
                </p>
              </Link>

              <Link to="/OrdersReturns">
                <p className="text-white text-sm mb-3 hover:underline">
                  Orders & Returns
                </p>
              </Link>

              <Link to="/ShippingDelivery">
                <p className="text-white text-sm mb-3 hover:underline">
                  Shipping & Delivery
                </p>
              </Link>

              <Link to="/Terms">
                <p className="text-white text-sm mb-3 hover:underline">Terms</p>
              </Link>
            </div>
          </div>

          {/* CUSTOMER SERVICE */}
          <div className=" md:w-[30%] lg:w-[16%]  px-6 py-10 ">
            <p className="text-white text-sm font-semibold mb-2">
              CUSTOMER SERVICE
            </p>
            <Link to="/HowToPlaceOrder">
              <p className="text-white text-sm mb-3 hover:underline">How to place an order</p>
            </Link>

            <Link to="/EditOrders">
              <p className="text-white text-sm mb-3 hover:underline">Edit Orders</p>
            </Link>

            <Link to="/ItemAvailability">
              <p className="text-white text-sm mb-3 hover:underline">Item Availability</p>
            </Link>

            <Link to="/PaymentMethods">
              <p className="text-white text-sm mb-3 hover:underline">Payment Methods</p>
            </Link>

            <Link to="/ShippingDelivery">
              <p className="text-white text-sm mb-3 hover:underline">Shipping & Delivery</p>
            </Link>

            <Link to="/VoucherCodes">
              <p className="text-white text-sm mb-3 hover:underline">Voucher Codes</p>
            </Link>
          </div>

          {/* CONTACT */}
          <div className=" md:w-[30%] lg:w-[18%]  px-4 py-10">
            <p className="text-white text-sm font-semibold mb-2">CONTACT US</p>

            <Link to="/TrackYourOrder">
              <p className="text-white text-sm mb-3">Phone : +03134183635</p>
            </Link>
            <Link to="/PrivacyPolicy">
              <p className="text-white text-sm mb-3">Whatsapp : +03134183635</p>
            </Link>
            <Link to="/Terms">
              <p className="text-white text-sm mb-3">
                Email : info@beyondeast.com
              </p>
            </Link>
          </div>

          {/* NEWSLETTER */}
          <div className="w-full md:w-full lg:w-[30%] bg-[#4f4f4f] px-6 py-10 ">
            <p className="text-white text-3xl lg:text-4xl font-semibold mb-3 ">
              EXCLUSIVE OFFERS STRAIGHT TO YOUR INBOX
            </p>
            <p className="text-white text-sm mb-4">
              Get special offers and limited-time deals. Join us today!
            </p>
            <div className="border-b border-white pb-1">
              <input
                type="email"
                placeholder="your-email@example.com"
                className="bg-transparent text-white outline-none w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MOBILE VIEW ==================== */}
      <div className="sm:hidden w-full bg-[#424242] pb-6">
        <div className="w-full bg-[#4f4f4f] px-6 py-10 mb-7">
          <p className="text-white text-3xl lg:text-4xl font-semibold mb-3 ">
            EXCLUSIVE OFFERS STRAIGHT TO YOUR INBOX
          </p>
          <p className="text-white text-sm mb-4">
            Get special offers and limited-time deals. Join us today!
          </p>
          <div className="border-b border-white pb-1">
            <input
              type="email"
              placeholder="your-email@example.com"
              className="bg-transparent text-white outline-none w-full"
            />
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <hr className="ml-4 mr-4" />
        <div className="max-w-3xl mx-auto px-4 text-white rounded-lg shadow-lg">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-600 py-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{item.question}</h3>
                <span className="text-xl">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>

              {/* Show answers if open */}
              {openIndex === index && (
                <div className="mt-2 text-gray-300 text-left space-y-2">
                  {item.answer.map((line, idx) => (
                    <p key={idx} className="hover:text-gray-400">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="md:flex lg:flex bg-[#1d1d1d] justify-between md:p-7 py-2 px-2 ">
        <div>
          <p className="text-white mt-2">© Beyond East Official 2025</p>
        </div>
        <div className="  flex  space-x-3 ">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-500 text-2xl transition mt-1"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red-600 text-2xl transition mt-1"
          >
            <FaYoutube />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-500 text-2xl transition mt-1"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
