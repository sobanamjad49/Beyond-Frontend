import React, { useEffect } from "react";

function StoreLocator() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 uppercase">Find Our Stores</h1>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Left: Store Info */}
        <div className="lg:w-1/3 border border-gray-300 p-4 rounded-md h-full overflow-y-auto max-h-[700px]">
          {/* Lahore */}
          <div className="mb-6">
            <button className="w-full bg-black text-white font-semibold py-2 rounded">
              Lahore
            </button>

            <div className="mt-4">
              <h2 className="text-lg font-semibold">Packages Mall</h2>
              <p className="text-sm">Shop # 2064, 2nd Floor Packages Mall, Walton Road Lahore.</p>
              <p className="font-semibold mt-2">Outlet Hours</p>
              <p className="text-sm">Mon - Sun, 10:30am - 11:00pm</p>
            </div>

            <hr className="my-4" />

            <div>
              <h2 className="text-lg font-semibold">Emporium Mall</h2>
              <p className="text-sm">
                16M Abdul Haque Rd, Trade Centre Commercial Area Phase 2 Johar Town, Lahore.
              </p>
              <p className="font-semibold mt-2">Outlet Hours</p>
              <p className="text-sm">Mon - Sun, 10:30am - 11:00pm</p>
            </div>
          </div>

          {/* Islamabad */}
          <div>
            <button className="w-full bg-black text-white font-semibold py-2 rounded">
              Islamabad
            </button>

            <div className="mt-4">
              <h2 className="text-lg font-semibold">Centaurus Mall</h2>
              <p className="text-sm">4 Jinnah Ave, Blue Area, Islamabad</p>
              <p className="font-semibold mt-2">Outlet Hours</p>
              <p className="text-sm">Mon - Sun, 10:30am - 11:00pm</p>
            </div>
          </div>
        </div>

        {/* Right: Embedded Map */}
        <div className="lg:w-2/3">
          <iframe
            title="Packages Mall Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13610.288177434428!2d74.31392666027739!3d31.461182542920254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904cb833394cb%3A0xa3d1878d71ed7da7!2sBEYOND%20EAST%20-%20Packages%20Mall!5e0!3m2!1sen!2s!4v1719999999999"
            width="100%"
            height="600"
            allowFullScreen=""
            loading="lazy"
            className="rounded-md border"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default StoreLocator;
