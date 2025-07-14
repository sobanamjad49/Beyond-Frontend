import "./App.css"; // Make sure the marquee CSS is available

function Header() {
  return (
    <div>
      {/* Marquee for sm and md screens */}
      <div className="bg-[#f7f5f4] text-xs p-1 text-center uppercase block lg:hidden overflow-hidden whitespace-nowrap">
        <marquee className="bg-[#f7f5f4] text-xs p-1 text-center uppercase overflow-hidden whitespace-nowrap w-full  bottom-6">
          <p className="tracking-widest">
            Get a Flat <strong>10% Off</strong> on All
            <strong> Prepaid Orders! </strong> | Use code
            <strong> PREPAID10% </strong> at checkout to enjoy your discount.
            &nbsp; &nbsp; &nbsp; Get a Flat <strong>10% Off</strong> on All
            <strong> Prepaid Orders! </strong> | Use code
            <strong> PREPAID10% </strong> at checkout to enjoy your discount.
          </p>
        </marquee>
      </div>
      {/* Static for lg and above */}
      <div className="bg-[#f7f5f4] text-xs p-1 text-center uppercase hidden lg:block">
        <p className="tracking-widest">
          Get a Flat <strong> 10% Off </strong> on All
          <strong> Prepaid Orders! </strong> | Use code
          <strong> PREPAID10% </strong> at checkout to enjoy your discount.
        </p>
      </div>
    </div>
  );
}

export default Header;
