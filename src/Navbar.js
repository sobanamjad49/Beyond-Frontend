import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FiTrash2 } from "react-icons/fi";
import { MdPersonAddAlt1, MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";

function Navbar() {
  const [openCart, setOpenCart] = useState(false);
  const {
    cart: cartItems,
    totalItems,
    updateCartQuantity,
    removeFromCart,
     clearCart,
  } = useCart();

const [openMenu, setOpenMenu] = useState(false);
const [openMenu1, setOpenMenu1] = useState(false);
const [openMenu2, setOpenMenu2] = useState(false);
const [openMenu3, setOpenMenu3] = useState(false);
const [openMenu4, setOpenMenu4] = useState(false);
const [openMenu5, setOpenMenu5] = useState(false);
const [openMenu6, setOpenMenu6] = useState(false);
const [openMenu7, setOpenMenu7] = useState(false);
const [openMenu8, setOpenMenu8] = useState(false);
const [openMenu9, setOpenMenu9] = useState(false);
const [openMenu10, setOpenMenu10] = useState(false);
const [openMenu11, setOpenMenu11] = useState(false);
const [openMenu12, setOpenMenu12] = useState(false);
const [openMenu13, setOpenMenu13] = useState(false);
const [openMenu14, setOpenMenu14] = useState(false);


  const [, setForceUpdate] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ✅ Check login state and update on login/logout
  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    checkLogin(); // initial check

    window.addEventListener("login", checkLogin);
    window.addEventListener("logout", checkLogin);

    return () => {
      window.removeEventListener("login", checkLogin);
      window.removeEventListener("logout", checkLogin);
    };
  }, []);

  // ✅ Handle logout
const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("authToken");
  clearCart(false); // صرف UI سے کارٹ صاف کریں
  setIsLoggedIn(false);
  window.dispatchEvent(new Event("logout"));
  navigate("/login");
  toast.success("Logged out successfully!");
};


  // ✅ Force update on cart change
  useEffect(() => {
    const handleCartUpdate = () => setForceUpdate((f) => f + 1);
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  return (
    <>
    <div className="flex justify-between items-center p-4 shadow-md">
      <button onClick={() => setOpenMenu(true)} className="text-2xl">
        &#9776;
      </button>

     <Link to="/"><h1 className="lg:text-3xl text-[1.4rem] font-bold ml-9">BEYOND EAST</h1></Link> 

      <div className="flex items-center gap-4">
        {/* 🔐 Auth Toggle */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            title="Logout"
            className="text-red-600 font-semibold border px-3 py-1 border-red-600 rounded hover:bg-red-600 hover:text-white"
          >
            <MdLogout className="text-xl" />
          </button>
        ) : (
          <Link to="/register" title="Create Account">
            <MdPersonAddAlt1 className="text-2xl text-gray-700 hover:text-black" />
          </Link>
        )}

        {/* 🛒 Cart Icon */}
        <button
          onClick={() => setOpenCart(true)}
          className="relative text-2xl"
          title="Cart"
        >
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          )}
          <HiOutlineShoppingCart />
        </button>
      </div>
    </div>
      
      {/* LEFT DRAWER - MENU */}
      {openMenu && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md"
            onClick={() => setOpenMenu(false)}
          ></div>

          {/* Drawer */}
          <div className="absolute  top-0 left-0 bg-white w-[24rem]  h-full shadow-lg  transform transition-transform duration-300 translate-x-0 ">
            <div className="flex justify-end p-2 ">
              <button
                onClick={() => setOpenMenu(false)}
                className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
              >
                &times;
              </button>
            </div>

            <hr className="w-[24rem]" />

            <nav className="flex flex-col  text-lg">
              <div>
                <div
                  className="flex justify-between p-4 cursor-pointer"
                  onClick={() => {
                    setOpenMenu1(true);
                  }}
                >
                  <div className="text-sm font-bold">NEW ARRIVAL</div>
                  <div>
                    <img
                      className="w-4 h-4 mt-[1px] "
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0VZxMMlw_salFnYRgK4MPGrosyfCZUVSqQ&s"
                    />
                  </div>
                </div>

                {openMenu1 && (
                  <div className="fixed inset-0 z-50">
                    <div className="absolute top-0 left-0 bg-white w-[24rem]  h-full shadow-lg  transform transition-transform duration-300 translate-x-0">
                      <div className="flex justify-end  p-2 ">
                        <button
                          onClick={() => {
                            setOpenMenu(false);
                            setOpenMenu1(false);
                            setOpenMenu2(false);
                          }}
                          className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
                        >
                          &times;
                        </button>
                      </div>
                      <hr className="w-[24rem]" />
                      <div
                        className="flex justify-between p-3 cursor-pointer"
                        onClick={() => setOpenMenu1(false)}
                      >
                        <div>
                          <img
                            className="w-4 h-4 mt-[1px] "
                            src="https://cdn-icons-png.flaticon.com/512/3877/3877262.png"
                          />
                        </div>

                        <div className="text-sm font-bold ">NEW ARRIVAL</div>

                        <hr />
                      </div>
                      <hr className="w-[24rem]" />

                      <div
                        className="flex justify-between p-4 cursor-pointer"
                        onClick={() => setOpenMenu2(true)}
                      >
                        <hr />
                        <div className="text-sm font-bold">NEW IN</div>
                        <div>
                          <img
                            className="w-4 h-4 mt-[1px] "
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0VZxMMlw_salFnYRgK4MPGrosyfCZUVSqQ&s"
                          />
                        </div>
                      </div>
                      <hr className="w-[24rem]" />
                    </div>
                    {openMenu2 && (
                      <div className="fixed inset-0 z-50">
                        <div className="absolute top-0 left-0 bg-white w-[24rem]  h-full shadow-lg  transform transition-transform duration-300 translate-x-0">
                          <div className="flex justify-end  p-2 ">
                            <button
                              onClick={() => {
                                setOpenMenu(false);
                                setOpenMenu1(false);
                                setOpenMenu2(false);
                              }}
                              className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
                            >
                              &times;
                            </button>
                          </div>
                          <hr className="w-[24rem]" />
                          <div className="flex justify-between p-3 cursor-pointer">
                            <div onClick={() => setOpenMenu2(false)}>
                              <img
                                className="w-4 h-4 mt-[1px] "
                                src="https://cdn-icons-png.flaticon.com/512/3877/3877262.png"
                              />
                            </div>

                          <div
                              className="text-sm font-bold cursor-pointer"
                              onClick={() => {
                            
                                setOpenMenu2(false);
                              }}
                          >
                              NEW ARRIVAL
                            </div>

                            <hr />
                          </div>
                          <hr className="w-[24rem]" />
                         <Link to="/FestiveUnstitched"> <p onClick={() => setOpenMenu(false)} className="hover:underline text-center p-4 text-sm font-bold">
                            FESTIVE UNSTITCHED
                          </p></Link>
                          <hr className="w-[24rem]" />
                           <Link to="/MonochromeUnstitched"> <p onClick={() => setOpenMenu(false)} className="hover:underline text-center p-4 text-sm font-bold">
                            MONOCHROME
                          </p></Link>
                          <hr className="w-[24rem]" />
                          <Link to="/PrintedUnstitched"><p onClick={() => setOpenMenu(false)} className="hover:underline text-center p-4 text-sm font-bold">
                            KAYA STITCHED - 25
                          </p></Link>
                          <hr className="w-[24rem]" />
                          <Link to="/Summerpret"><p onClick={() => setOpenMenu(false)} className="hover:underline text-center p-4 text-sm font-bold">
                            SUMMER - 25
                          </p></Link>
                          <hr className="w-[24rem]" />
                          <Link to="/FestivePret"><p onClick={() => setOpenMenu(false)} className="hover:underline text-center p-4 text-sm font-bold">
                            PRET
                          </p></Link>
                          <hr className="w-[24rem]" />
                         <Link to="/EmborideredPret"> <p onClick={() => setOpenMenu(false)} className="hover:underline text-center p-4 text-sm font-bold">
                            UNSTITCHED
                          </p></Link>
                          <hr className="w-[24rem]" />
                          <Link to="/Abayas"> <p onClick={() => setOpenMenu(false)} className="hover:underline text-center p-4 text-sm font-bolduppercase ">
                            Modestwear
                          </p></Link>
                          <hr className="w-[24rem]" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <hr />

              <div>
                <div
                  className="flex justify-between p-4 cursor-pointer"
                  onClick={() => {
                    setOpenMenu3(true);
                  }}
                >
                  <div className="text-sm font-bold">PRET</div>
                  <div>
                    <img
                      className="w-4 h-4 mt-[1px] "
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0VZxMMlw_salFnYRgK4MPGrosyfCZUVSqQ&s"
                    />
                  </div>
                </div>

                {openMenu3 && (
                  <div className="fixed inset-0 z-50">
                    <div className="absolute top-0 left-0 bg-white w-[24rem]  h-full shadow-lg  transform transition-transform duration-300 translate-x-0">
                      <div className="flex justify-end  p-2 ">
                        <button
                          onClick={() => {
                            setOpenMenu(false);
                            setOpenMenu3(false);
                            setOpenMenu4(false);
                          }}
                          className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
                        >
                          &times;
                        </button>
                      </div>
                      <hr className="w-[24rem]" />
                      <div
                        className="flex justify-between p-3 cursor-pointer"
                        onClick={() => setOpenMenu3(false)}
                      >
                        <div>
                          <img
                            className="w-4 h-4 mt-[1px] "
                            src="https://cdn-icons-png.flaticon.com/512/3877/3877262.png"
                          />
                        </div>

                        <div className="text-sm font-bold ">PRET</div>

                        <hr />
                      </div>
                      <hr className="w-[24rem]" />

                      <div
                        className="flex justify-between p-4 cursor-pointer"
                        onClick={() => setOpenMenu4(true)}
                      >
                        <hr />
                        <div className="text-sm font-bold">READY TO WEAR</div>
                        <div>
                          <img
                            className="w-4 h-4 mt-[1px] "
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0VZxMMlw_salFnYRgK4MPGrosyfCZUVSqQ&s"
                          />
                        </div>
                      </div>
                      <hr className="w-[24rem]" />
                    </div>
                    {openMenu4 && (
                      <div className="fixed inset-0 z-50">
                        <div className="absolute top-0 left-0 bg-white w-[24rem]  h-full shadow-lg  transform transition-transform duration-300 translate-x-0">
                          <div className="flex justify-end  p-2 ">
                            <button
                              onClick={() => {
                                setOpenMenu(false);
                                setOpenMenu3(false);
                                setOpenMenu4(false);
                              }}
                              className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
                            >
                              &times;
                            </button>
                          </div>
                          <hr className="w-[24rem]" />
                          <div className="flex justify-between p-3 cursor-pointer">
                            <div onClick={() => setOpenMenu4(false)}>
                              <img
                                className="w-4 h-4 mt-[1px] "
                                src="https://cdn-icons-png.flaticon.com/512/3877/3877262.png"
                              />
                            </div>

                            <div
                            
                              className="text-sm font-bold cursor-pointer"
                              onClick={() => {
                              
                                setOpenMenu4(false);
                              
                              }}
                            >
                              READY TO WEAR
                            </div>

                            <hr />
                          </div>
                          <hr className="w-[24rem]" />
                         <Link to="/Summerpret"> <p onClick={() => setOpenMenu(false)}  className="hover:underline text-center p-4 text-sm font-bold">
                            SUMMER - 25
                          </p></Link>
                          <hr className="w-[24rem]" />
                         <Link to="/MonochromeUnstitched"><p onClick={() => setOpenMenu(false)}  className="hover:underline text-center p-4 text-sm font-bold">
                            MONOCHROME
                          </p></Link> 
                          <hr className="w-[24rem]" />
                          <Link to="/PrintedUnstitched"><p onClick={() => setOpenMenu(false)}  className="hover:underline text-center p-4 text-sm font-bold">
                            PRINTED
                          </p></Link>
                          <hr className="w-[24rem]" />
                          
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <hr />
              <div>
                <div
                  className="flex justify-between p-4 cursor-pointer"
                  onClick={() => {
                    setOpenMenu5(true);
                  }}
                >
                  <div className="text-sm font-bold">UNSTITCHED</div>
                  <div>
                    <img
                      className="w-4 h-4 mt-[1px] "
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0VZxMMlw_salFnYRgK4MPGrosyfCZUVSqQ&s"
                    />
                  </div>
                </div>

                {openMenu5 && (
                  <div className="fixed inset-0 z-50">
                    <div className="absolute top-0 left-0 bg-white w-[24rem]  h-full shadow-lg  transform transition-transform duration-300 translate-x-0">
                      <div className="flex justify-end  p-2 ">
                        <button
                          onClick={() => {
                            setOpenMenu(false);
                            setOpenMenu5(false);
                            setOpenMenu6(false);
                          }}
                          className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
                        >
                          &times;
                        </button>
                      </div>
                      <hr className="w-[24rem]" />
                      <div
                        className="flex justify-between p-3 cursor-pointer"
                        onClick={() => setOpenMenu5(false)}
                      >
                        <div>
                          <img
                            className="w-4 h-4 mt-[1px] "
                            src="https://cdn-icons-png.flaticon.com/512/3877/3877262.png"
                          />
                        </div>

                        <div className="text-sm font-bold ">UNSTITCHED</div>

                        <hr />
                      </div>
                      <hr className="w-[24rem]" />

                      <div
                        className="flex justify-between p-4 cursor-pointer"
                        onClick={() => setOpenMenu6(true)}
                      >
                        <hr />
                        <div className="text-sm font-bold">SHOP BY PIECE</div>
                        <div>
                          <img
                            className="w-4 h-4 mt-[1px] "
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0VZxMMlw_salFnYRgK4MPGrosyfCZUVSqQ&s"
                          />
                        </div>
                      </div>
                      <hr className="w-[24rem]" />
                    </div>
                    {openMenu6 && (
                      <div className="fixed inset-0 z-50">
                        <div className="absolute top-0 left-0 bg-white w-[24rem]  h-full shadow-lg  transform transition-transform duration-300 translate-x-0">
                          <div className="flex justify-end  p-2 ">
                            <button
                              onClick={() => {
                                setOpenMenu(false);
                                setOpenMenu5(false);
                                setOpenMenu6(false);
                              }}
                              className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
                            >
                              &times;
                            </button>
                          </div>
                          <hr className="w-[24rem]" />
                          <div className="flex justify-between p-3 cursor-pointer">
                            <div onClick={() => setOpenMenu6(false)}>
                              <img
                                className="w-4 h-4 mt-[1px] "
                                src="https://cdn-icons-png.flaticon.com/512/3877/3877262.png"
                              />
                            </div>

                            <div
                             
                              className="text-sm font-bold cursor-pointer"
                              onClick={() => {
                                
                                setOpenMenu6(false);
                              }}
                            >
                              SHOP BY PIECE
                            </div>

                            <hr />
                          </div>
                          <hr className="w-[24rem]" />
                       <Link to={"/productdetails/6872ed20e48164c5d03f3bc3"}>
  <p onClick={() => setOpenMenu(false)}  className="hover:underline text-center p-4 text-sm font-boldhover:underline">
    1 PIECE
  </p>
</Link>
                          <hr className="w-[24rem]" />
                            <Link to={"/productdetails/6872ed20e48164c5d03f3bc1"}><p onClick={() => setOpenMenu(false)}  className=" hover:underline hover:underline text-center p-4 text-sm font-bold">
                            2 PIECE
                          </p></Link> 
                          <hr className="w-[24rem]" />
                            <Link to={"/productdetails/6872ed1fe48164c5d03f3bbf"}><p onClick={() => setOpenMenu(false)}  className="hover:underline hover:underline text-center p-4 text-sm font-bold">
                            3 PIECE
                          </p></Link>
                          <hr className="w-[24rem]" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <hr />
              <div>
                <div
                  className="flex justify-between p-4 cursor-pointer"
                  onClick={() => {
                    setOpenMenu7(true);
                  }}
                >
                  <div className="text-sm font-bold">FESTIVE</div>
                  <div>
                    <img
                      className="w-4 h-4 mt-[1px] "
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0VZxMMlw_salFnYRgK4MPGrosyfCZUVSqQ&s"
                    />
                  </div>
                </div>

                {openMenu7 && (
                  <div className="fixed inset-0 z-50">
                    <div className="absolute top-0 left-0 bg-white w-[24rem]  h-full shadow-lg  transform transition-transform duration-300 translate-x-0">
                      <div className="flex justify-end  p-2 ">
                        <button
                          onClick={() => {
                            setOpenMenu(false);
                            setOpenMenu7(false);
                            setOpenMenu8(false);
                          }}
                          className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
                        >
                          &times;
                        </button>
                      </div>
                      <hr className="w-[24rem]" />
                      <div
                        className="flex justify-between p-3 cursor-pointer"
                        onClick={() => setOpenMenu7(false)}
                      >
                        <div>
                          <img
                            className="w-4 h-4 mt-[1px] "
                            src="https://cdn-icons-png.flaticon.com/512/3877/3877262.png"
                          />
                        </div>

                        <div className="text-sm font-bold ">FESTIVE</div>

                        <hr />
                      </div>
                      <hr className="w-[24rem]" />

                      <div
                        className="flex justify-between p-4 cursor-pointer"
                        onClick={() => setOpenMenu8(true)}
                      >
                        <hr />
                        <div className="text-sm font-bold">FESTIVE</div>
                        <div>
                          <img
                            className="w-4 h-4 mt-[1px] "
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0VZxMMlw_salFnYRgK4MPGrosyfCZUVSqQ&s"
                          />
                        </div>
                      </div>
                      <hr className="w-[24rem]" />
                    </div>
                    {openMenu8 && (
                      <div className="fixed inset-0 z-50">
                        <div className="absolute top-0 left-0 bg-white w-[24rem]  h-full shadow-lg  transform transition-transform duration-300 translate-x-0">
                          <div className="flex justify-end  p-2 ">
                            <button
                              onClick={() => {
                                setOpenMenu(false);
                                setOpenMenu7(false);
                                setOpenMenu8(false);
                              }}
                              className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
                            >
                              &times;
                            </button>
                          </div>
                          <hr className="w-[24rem]" />
                          <div className="flex justify-between p-3 cursor-pointer">
                            <div onClick={() => setOpenMenu8(false)}>
                              <img
                                className="w-4 h-4 mt-[1px] "
                                src="https://cdn-icons-png.flaticon.com/512/3877/3877262.png"
                              />
                            </div>

                            <div
                             
                              className="text-sm font-bold cursor-pointer"
                              onClick={() => {
                                setOpenMenu8(false);
                              
                              }}
                            >
                              FESTIVE
                            </div>

                            <hr />
                          </div>
                          <hr className="w-[24rem]" />
                         <Link to="/FestivePret"> <p onClick={() => setOpenMenu(false)}  className="hover:underline text-center p-4 text-sm font-bold">
                            STITCHED
                          </p></Link>
                          <hr className="w-[24rem]" />
                          <Link to="/FestiveUnstitched"><p onClick={() => setOpenMenu(false)}   className="hover:underline text-center p-4 text-sm font-bold">
                            UNSTITCHED
                          </p></Link>
                          <hr className="w-[24rem]" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <hr />
              <Link to="/Abayas" onClick={() => setOpenMenu(false)}>
                <div className="text-sm font-bold p-4">MODEST WEAR</div>
              </Link>
              <hr />
              <div>
                <div
                  className="flex justify-between p-4 cursor-pointer"
                  onClick={() => {
                    setOpenMenu9(true);
                  }}
                >
                  <div className="text-sm font-bold">ACCESSORIES</div>
                  <div>
                    <img
                      className="w-4 h-4 mt-[1px] "
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0VZxMMlw_salFnYRgK4MPGrosyfCZUVSqQ&s"
                    />
                  </div>
                </div>

                {openMenu9 && (
                  <div className="fixed inset-0 z-50">
                    <div className="absolute top-0 left-0 bg-white w-[24rem]  h-full shadow-lg  transform transition-transform duration-300 translate-x-0">
                      <div className="flex justify-end  p-2 ">
                        <button
                          onClick={() => {
                            setOpenMenu(false);
                            setOpenMenu9(false);
                            setOpenMenu10(false);
                          }}
                          className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
                        >
                          &times;
                        </button>
                      </div>
                      <hr className="w-[24rem]" />
                      <div
                        className="flex justify-between p-3 cursor-pointer"
                        onClick={() => setOpenMenu9(false)}
                      >
                        <div>
                          <img
                            className="w-4 h-4 mt-[1px] "
                            src="https://cdn-icons-png.flaticon.com/512/3877/3877262.png"
                          />
                        </div>

                        <div className="text-sm font-bold ">ACCESSORIES</div>

                        <hr />
                      </div>
                      <hr className="w-[24rem]" />

                      <div
                      
                      >
                       
                          <Link to="/Bags"><p onClick={() => setOpenMenu(false)}  className="hover:underline text-center p-4 text-sm font-bold">
                            BAGS
                          </p></Link>
                          <hr className="w-[24rem]" />
                         <Link to="/Jewellery"><p onClick={() => setOpenMenu(false)} className="hover:underline text-center p-4 text-sm font-bold">
                            JEWELLERY
                          </p></Link>
                       
                      </div>
                      <hr className="w-[24rem]" />
                    </div>
                
                  </div>
                )}
              </div>
              <hr />
              <div>
                <div
                  className="flex justify-between p-4 cursor-pointer"
                  onClick={() => {
                    setOpenMenu11(true);
                  }}
                >
                  <div className="text-sm font-bold">FRAGRANCES</div>
                  <div>
                    <img
                      className="w-4 h-4 mt-[1px] "
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0VZxMMlw_salFnYRgK4MPGrosyfCZUVSqQ&s"
                    />
                  </div>
                </div>

                {openMenu11 && (
                  <div className="fixed inset-0 z-50">
                    <div className="absolute top-0 left-0 bg-white w-[24rem]  h-full shadow-lg  transform transition-transform duration-300 translate-x-0">
                      <div className="flex justify-end  p-2 ">
                        <button
                          onClick={() => {
                            setOpenMenu(false);
                            setOpenMenu11(false);
                            setOpenMenu12(false);
                          }}
                          className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
                        >
                          &times;
                        </button>
                      </div>
                      <hr className="w-[24rem]" />
                      <div
                        className="flex justify-between p-3 cursor-pointer"
                        onClick={() => setOpenMenu11(false)}
                      >
                        <div>
                          <img
                            className="w-4 h-4 mt-[1px] "
                            src="https://cdn-icons-png.flaticon.com/512/3877/3877262.png"
                          />
                        </div>

                        <div className="text-sm font-bold ">FRAGRANCES</div>

                        <hr />
                      </div>
                      <hr className="w-[24rem]" />

                      <div
                    
                      >
                        <hr />
                       <Link to="/Fragrances"> <p onClick={() => setOpenMenu(false)} className="hover:underline text-center p-4 text-sm font-bold">
                          GENDER AND TYPES
                        </p></Link>
                       
                      </div>
                      <hr className="w-[24rem]" />
                    </div>
                   
                  </div>
                )}
              </div>
              <hr />
              <div>
                <div
                  className="flex justify-between p-4 cursor-pointer"
                  onClick={() => {
                    setOpenMenu13(true);
                  }}
                >
                  <div className="text-sm font-bold">LAST CHANCE TO BUY</div>
                  <div>
                    <img
                      className="w-4 h-4 mt-[1px] "
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0VZxMMlw_salFnYRgK4MPGrosyfCZUVSqQ&s"
                    />
                  </div>
                </div>

                {openMenu13 && (
                  <div className="fixed inset-0 z-50">
                    <div className="absolute top-0 left-0 bg-white w-[24rem]  h-full shadow-lg  transform transition-transform duration-300 translate-x-0">
                      <div className="flex justify-end  p-2 ">
                        <button
                          onClick={() => {
                            setOpenMenu(false);
                            setOpenMenu13(false);
                            setOpenMenu14(false);
                          }}
                          className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
                        >
                          &times;
                        </button>
                      </div>
                      <hr className="w-[24rem]" />
                      <div
                        className="flex justify-between p-3 cursor-pointer"
                        onClick={() => setOpenMenu13(false)}
                      >
                        <div>
                          <img
                            className="w-4 h-4 mt-[1px] "
                            src="https://cdn-icons-png.flaticon.com/512/3877/3877262.png"
                          />
                        </div>

                        <div className="text-sm font-bold text-red-500">
                          LAST CHANCE TO BUY
                        </div>

                        <hr />
                      </div>
                      <hr className="w-[24rem]" />

                      <div
                        className="flex justify-between p-4 cursor-pointer"
                        onClick={() => setOpenMenu14(true)}
                      >
                        <hr />
                        <div className="text-sm font-bold text-red-500">
                          SALE
                        </div>
                        <div>
                          <img
                            className="w-4 h-4 mt-[1px] "
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0VZxMMlw_salFnYRgK4MPGrosyfCZUVSqQ&s"
                          />
                        </div>
                      </div>
                      <hr className="w-[24rem]" />
                    </div>
                    {openMenu14 && (
                      <div className="fixed inset-0 z-50">
                        <div className="absolute top-0 left-0 bg-white w-[24rem]  h-full shadow-lg  transform transition-transform duration-300 translate-x-0">
                          <div className="flex justify-end  p-2 ">
                            <button
                              onClick={() => {
                                setOpenMenu(false);
                                setOpenMenu13(false);
                                setOpenMenu14(false);
                              }}
                              className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
                            >
                              &times;
                            </button>
                          </div>
                          <hr className="w-[24rem]" />
                          <div className="flex justify-between p-3 cursor-pointer">
                            <div onClick={() => setOpenMenu14(false)}>
                              <img
                                className="w-4 h-4 mt-[1px] "
                                src="https://cdn-icons-png.flaticon.com/512/3877/3877262.png"
                              />
                            </div>

                            <Link
                              to="/Pret"
                              className="text-sm font-bold cursor-pointer text-red-500"
                              onClick={() => {
                                setOpenMenu(false);
                                setOpenMenu13(false);
                                setOpenMenu14(false);
                              }}
                            >
                              SALE
                            </Link>

                            <hr />
                          </div>
                          <hr className="w-[24rem]" />
                          <p className="hover:underline text-center p-4 text-sm font-bold">
                            UNSTITCHED WINTER SALE
                          </p>
                          <hr className="w-[24rem]" />
                          <p className="hover:underline text-center p-4 text-sm font-bold">
                            ACCESSORIES
                          </p>
                          <hr className="w-[24rem]" />
                          <p className="hover:underline text-center p-4 text-sm font-bold">
                            FRAGRANCES
                          </p>
                          <hr className="w-[24rem]" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <hr />
            </nav>
          </div>
        </div>
      )}

  {/* RIGHT DRAWER - CART */}
      {openCart && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpenCart(false)}
          />

          <div className="ml-auto w-full max-w-sm h-full bg-white shadow-lg p-6 relative flex flex-col">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500"
              onClick={() => setOpenCart(false)}
            >
              &times;
            </button>

            <h2 className="text-lg font-semibold uppercase text-center mb-6">
              Cart
            </h2>

            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                  <HiOutlineShoppingCart className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-600">
                  Your cart is empty.
                </h3>
                <button
                  onClick={() => {
                    setOpenCart(false);
                    navigate("/");
                  }}
                  className="text-sm uppercase font-semibold text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-all"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List - Scrollable */}
                <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                  {cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center border-b pb-3 gap-3 relative"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-16 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center border">
                        {Array.isArray(item.images) &&
                        item.images.length > 0 ? (
                          <img
                            src={item.images[0]}
                            alt={item.name || item.description}
                            className="object-cover w-full h-full"
                          />
                        ) : item.image ? (
                          <img
                            src={item.image}
                            alt={item.name || item.description}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">
                            No Image
                          </span>
                        )}
                      </div>
                      {/* Product Info */}
                      <div className="flex-1 ml-2">
                        <h3 className="font-medium truncate">
                          {item.name || item.description}
                        </h3>
                        <p className="text-xs text-gray-500 truncate mb-1">
                          Size: {item.size}
                        </p>
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            className="px-2 py-1 text-lg border rounded hover:bg-black hover:text-white"
                            onClick={() => {
                              if (item.quantity > 1)
                                updateCartQuantity(idx, item.quantity - 1);
                            }}
                          >
                            −
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            className="px-2 py-1 text-lg border rounded hover:bg-black hover:text-white"
                            onClick={() =>
                              updateCartQuantity(idx, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        {/* Price */}
                        <div style={{ marginTop: "10px" }}>
                          <span className="font-semibold text-gray-800 ">
                            Rs.{" "}
                            {Number(item.price)
                              ? Number(item.price).toLocaleString()
                              : 0}
                          </span>
                        </div>
                      </div>
                      {/* Remove Button */}
                      <button
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full mt-4"
                        aria-label="Remove item"
                        onClick={() => removeFromCart(idx)}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Subtotal and Checkout Button - always at bottom */}
                <div className="sticky bottom-0 left-0 right-0 bg-white pt-4 border-t font-semibold text-base flex flex-col gap-4 mt-4 z-10">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span>
                      Rs.{" "}
                      {cartItems
                        .reduce(
                          (acc, item) =>
                            acc + Number(item.price) * item.quantity,
                          0
                        )
                        .toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setOpenCart(false);
                      navigate("/Checkout");
                    }}
                    className="w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition"
                  >
                    Go to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </>
  );
}

export default Navbar;


