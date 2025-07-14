import React, { useRef } from "react";
import HoverSlideshowCard from "./HoverSlideshowCard";
import HoverSlideshowCard1 from "./HoverSlideshowCard1";
import ImageSlideshow from "./ImageSlideshow";
import { Link } from "react-router-dom";
import { useProducts } from "./ProductContext";

// ✅ Static fallback category images
const staticCategoryImages = [
  {
    category: "Categoryimages",
    src: "https://www.beyondeast.com/cdn/shop/files/website_thumbnails.jpg_2_300x300.webp?v=1748257781",
    link: "/FestivePret",
  },
  {
    category: "Categoryimages",
    src: "https://www.beyondeast.com/cdn/shop/files/website_thumbnails.jpg_3_300x300.webp?v=1748257820",
    link: "/EmborideredPret",
  },
  {
    category: "Categoryimages",
    src: "https://www.beyondeast.com/cdn/shop/files/website_thumbnails-1_300x300.webp?v=1748609506",
    link: "/PrintedPret",
  },
  {
    category: "Categoryimages",
    src: "https://www.beyondeast.com/cdn/shop/files/website_thumbnails.jpg_4_300x300.webp?v=1748257844",
    link: "/PrintedUnstitched",
  },
  {
    category: "Categoryimages",
    src: "https://www.beyondeast.com/cdn/shop/files/0_EMBROIDERED_UNSTITCHED_300x300.webp?v=1744009783",
    link: "/EmborideredUnstitched",
  },
  {
    category: "Categoryimages",
    src: "https://www.beyondeast.com/cdn/shop/files/ABAYAS_thumbnail_300x300.webp?v=1744009831",
    link: "/Abayas",
  },
  {
    category: "Categoryimages",
    src: "https://www.beyondeast.com/cdn/shop/files/00_JEWELLERY_300x300.jpg?v=1745489456",
    link: "/Jewellery",
  },
  {
    category: "Categoryimages",
    src: "https://www.beyondeast.com/cdn/shop/files/BAGS_300x300.webp?v=1744009650",
    link: "/Bags",
  },
  {
    category: "Categoryimages",
    src: "https://www.beyondeast.com/cdn/shop/files/0_FESTIVE_UNSTITCHED_300x300.webp?v=1744009876",
    link: "/FestiveUnstitched",
  },
  {
    category: "Categoryimages",
    src: "https://www.beyondeast.com/cdn/shop/files/perfume_thumbnail_300x300.webp?v=1733725665",
    link: "/Fragrances",
  },
];

const BeyondEast = () => {
  const { products, loading } = useProducts();

  const scrollAmount = 320;
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // 🟡 Replace this with fallback if empty

  const trendingSlides = products.filter(
    (item) => item.category === "trendingSlides"
  );
  const monochromeSlide1 = products.filter(
    (item) => item.category === "monochromeSlide1"
  );
  const monochromeSlide2 = products.filter(
    (item) => item.category === "monochromeSlide2"
  );
  const monochromeSlides12 = products.filter(
    (item) => item.category === "monochromeSlides12"
  );
  const FestivePret3 = products.filter(
    (item) => item.category === "FestivePret3"
  );
  const FestivePret4 = products.filter(
    (item) => item.category === "FestivePret4"
  );
  const FestivePret34 = products.filter(
    (item) => item.category === "FestivePret34"
  );
  const SummerPret5 = products.filter(
    (item) => item.category === "SummerPret5"
  );
  const SummerPret6 = products.filter(
    (item) => item.category === "SummerPret6"
  );
  const SummerPret56 = products.filter(
    (item) => item.category === "SummerPret56"
  );
  const KayaSummer7 = products.filter(
    (item) => item.category === "KayaSummer7"
  );
  const KayaSummer8 = products.filter(
    (item) => item.category === "KayaSummer8"
  );
  const KayaSummer78 = products.filter(
    (item) => item.category === "KayaSummer78"
  );
  const ImageSlidemobile = products.filter(
    (item) => item.category === "ImageSlidemobile"
  );
  const ImageSlidedesktop = products.filter(
    (item) => item.category === "ImageSlidedesktop"
  );

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">Loading...</div>
    );
  }

  return (
    <div className="w-full relative">
      {/* ✅ MOBILE SLIDESHOW */}
      <div className="block sm:hidden w-full h-full">
        <ImageSlideshow
          images={ImageSlidemobile.flatMap((i) => i.images)}
          interval={3000}
        />
      </div>

      {/* ✅ DESKTOP SLIDESHOW */}
      <div className="hidden sm:block">
        <ImageSlideshow
          images={ImageSlidedesktop.flatMap((i) => i.images)}
          interval={4000}
        />
      </div>

      {/* ✅ SHOP BY CATEGORY */}
      <p className="text-center mt-5 font-medium text-amber-950 text-lg">
        SHOP BY CATEGORY
      </p>
      <div className="relative w-full mt-2">
        <div
          ref={ref1}
          className="flex overflow-x-auto scroll-smooth space-x-4 scrollbar-hide px-4"
        >
          {staticCategoryImages.map((item, index) => (
            <Link to={item.link} key={index} className="min-w-[200px]">
              <img
                src={item.src}
                alt={`Category ${index}`}
                className="h-52 w-full rounded-xl mt-4 transition-transform duration-300 ease-in-out hover:-translate-y-2"
              />
            </Link>
          ))}
        </div>

        <button
          onClick={() => scroll(ref1, "left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-1 rounded z-10"
        >
          ⬅
        </button>
        <button
          onClick={() => scroll(ref1, "right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-1 rounded z-10"
        >
          ➡
        </button>
      </div>
      {/* --- TRENDING --- */}
      <p className="text-center mt-10 mb-9 font-medium text-amber-950 text-lg">
        TRENDING
      </p>

      <button
        onClick={() => scroll(ref2, "left")}
        className=" absolute left-0  -translate-y-1/2 bg-black text-white px-3 py-1 rounded shadow z-10"
      >
        ⬅
      </button>
      <button
        onClick={() => scroll(ref2, "right")}
        className="absolute right-0 -translate-y-1/2 bg-black text-white px-3 py-1 rounded shadow z-10"
      >
        ➡
      </button>

      <div className=" w-full mt-2">
        <div
          ref={ref2}
          className="flex overflow-x-auto scroll-smooth space-x-4 scrollbar-hide px-4"
        >
          {trendingSlides?.map((item, index) => (
            <HoverSlideshowCard
        key={index}
                _id={item._id}
                images={item.images}
                description={item.description}
                description1={item.description1}
                price={item.price}
            />
          ))}
          
        </div>
        
      </div>
      

      {/* --- MARQUEE --- */}
      <div className="bg-[#f7f5f4] text-xs p-1 text-center uppercase mt-6 mb-7 overflow-hidden whitespace-nowrap">
        <marquee className="bg-[#f7f5f4] text-2xl p-2 text-center uppercase overflow-hidden whitespace-nowrap w-full bottom-6 font-normal">
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

      {/* --- Extra Static Section with Images --- */}
      <p className="text-center mt-10 mb-9 font-medium p-1  text-black text-lg">
        MONOCHROME UNSTITCHED
      </p>
      <div className="flex ">
        <div className=" overflow-hidden  relative group ml-3 mr-3 ">
          <Link to="/MonochromeUnstitched">
            <img
              src="https://www.beyondeast.com/cdn/shop/files/BOX_UNSTITCHED.jpg_2.webp?height=1500&v=1749800950&width=1200"
              alt="Zoom"
              className="md:w-full lg:w-[39rem] h-full object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
            />
          </Link>
        </div>

        <div className="sm:block hidden">
          <div className="flex ml-6 mb-3 ">
            {monochromeSlide1.map((item, index) => (
              <HoverSlideshowCard1
                key={index}
                _id={item._id}
                images={item.images}
                description={item.description}
                description1={item.description1}
                price={item.price}
              />
            ))}
          </div>
          <div className="flex ml-6 ">
            {monochromeSlide2.map((item, index) => (
              <HoverSlideshowCard1
                key={index}
                images={item.images}
                _id={item._id}
                description={item.description}
                description1={item.description1}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-7 block sm:hidden">
        <button
          onClick={() => scroll(ref3, "left")}
          className=" absolute left-0  -translate-y-1/2 bg-black text-white px-3 py-1 rounded shadow z-10"
        >
          ⬅
        </button>
        <button
          onClick={() => scroll(ref3, "right")}
          className="absolute right-0 -translate-y-1/2 bg-black text-white px-3 py-1 rounded shadow z-10"
        >
          ➡
        </button>

        <div className=" w-full mt-2 ">
          <div
            ref={ref3}
            className="flex overflow-x-auto scroll-smooth space-x-4 scrollbar-hide px-4"
          >
            {monochromeSlides12?.map((item, index) => (
              <HoverSlideshowCard
                key={index}
                _id={item._id}
                images={item.images}
                description={item.description}
                description1={item.description1}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>

      {/* --- Extra Static Section with Images --- */}
      <p className="text-center mt-10 mb-9 font-medium p-1 text-amber-950 text-lg">
        FESTIVE PRET
      </p>
      <div className="flex ">
        <div className="sm:block hidden">
          <div className="flex ml-6 mb-3 ">
            {FestivePret3.map((item, index) => (
              <HoverSlideshowCard1
                key={index}
                images={item.images}
                description={item.description}
                description1={item.description1}
                price={item.price}
              />
            ))}
          </div>
          <div className="flex ml-6 ">
            {FestivePret4.map((item, index) => (
              <HoverSlideshowCard1
                key={index}
                _id={item._id}
                images={item.images}
                description={item.description}
                description1={item.description1}
                price={item.price}
              />
            ))}
          </div>
        </div>
        <div className=" overflow-hidden  relative group ml-3 mr-3 ">
          <Link to="/FestivePret">
            <img
              src="https://www.beyondeast.com/cdn/shop/files/BOX_UNSTITCHED_2ee479ce-dc43-4cfc-8245-7cdd2abd7747.webp?height=1500&v=1749800949&width=1200"
              alt="Zoom"
              className="md:w-full lg:w-[39rem] h-full object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
            />
          </Link>
        </div>
      </div>
      <div className="mt-7 block sm:hidden">
        <button
          onClick={() => scroll(ref3, "left")}
          className=" absolute left-0  -translate-y-1/2 bg-black text-white px-3 py-1 rounded shadow z-10"
        >
          ⬅
        </button>
        <button
          onClick={() => scroll(ref3, "right")}
          className="absolute right-0 -translate-y-1/2 bg-black text-white px-3 py-1 rounded shadow z-10"
        >
          ➡
        </button>

        <div className=" w-full mt-2 ">
          <div
            ref={ref3}
            className="flex overflow-x-auto scroll-smooth space-x-4 scrollbar-hide px-4"
          >
            {FestivePret34?.map((item, index) => (
              <HoverSlideshowCard key={index} images={item.images} />
            ))}
          </div>
        </div>
      </div>
      {/* --- Extra Static Section with Images --- */}
      <p className="text-center mt-10 mb-9 font-medium text-amber-950 p-1 text-lg">
        SUMMER PRET
      </p>
      <div className="flex ">
        <div className=" overflow-hidden  relative group ml-3 mr-3 ">
          <Link to="Summerpret">
            <img
              src="https://www.beyondeast.com/cdn/shop/files/BOX_UNSTITCHED_3_ratio_4_1.webp?v=1748257964&width=1200"
              alt="Zoom"
              className="md:w-full lg:w-[39rem] h-full object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
            />
          </Link>
        </div>

        <div className="sm:block hidden">
          <div className="flex ml-6 mb-3 ">
            {SummerPret5.map((item, index) => (
              <HoverSlideshowCard1
                key={index}
                _id={item._id}
                images={item.images}
                description={item.description}
                description1={item.description1}
                price={item.price}
              />
            ))}
          </div>
          <div className="flex ml-6 ">
            {SummerPret6.map((item, index) => (
              <HoverSlideshowCard1
                key={index}
                _id={item._id}
                images={item.images}
                description={item.description}
                description1={item.description1}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-7 block sm:hidden">
        <button
          onClick={() => scroll(ref3, "left")}
          className=" absolute left-0  -translate-y-1/2 bg-black text-white px-3 py-1 rounded shadow z-10"
        >
          ⬅
        </button>
        <button
          onClick={() => scroll(ref3, "right")}
          className="absolute right-0 -translate-y-1/2 bg-black text-white px-3 py-1 rounded shadow z-10"
        >
          ➡
        </button>

        <div className=" w-full mt-2 ">
          <div
            ref={ref3}
            className="flex overflow-x-auto scroll-smooth space-x-4 scrollbar-hide px-4"
          >
            {SummerPret56?.map((item, index) => (
              <HoverSlideshowCard
                key={index}
                _id={item._id}
                images={item.images}
                description={item.description}
                description1={item.description1}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-center mt-10 mb-9 font-medium text-amber-950 p-1 text-lg">
        KAYA SUMMER
      </p>
      <div className="flex ">
        <div className="sm:block hidden">
          <div className="flex ml-6 mb-3 ">
            {KayaSummer7.map((item, index) => (
              <HoverSlideshowCard1
                key={index}
                _id={item._id}
                images={item.images}
                description={item.description}
                description1={item.description1}
                price={item.price}
              />
            ))}
          </div>
          <div className="flex ml-6 ">
            {KayaSummer8.map((item, index) => (
              <HoverSlideshowCard1
                key={index}
                _id={item._id}
                images={item.images}
                description={item.description}
                description1={item.description1}
                price={item.price}
              />
            ))}
          </div>
        </div>
        <div className=" overflow-hidden  relative group ml-3 mr-3 ">
          <Link to="PrintedUnstitched">
            {" "}
            <img
              src="https://www.beyondeast.com/cdn/shop/files/unstitche_box_banner_d925344f-9625-46b3-978b-b65544dcc063.webp?height=1087&v=1748247739&width=1004"
              alt="Zoom"
              className=" w-full h-full object-cover"
            />
          </Link>
        </div>
      </div>
      <div className="mt-7 block sm:hidden">
        <button
          onClick={() => scroll(ref3, "left")}
          className=" absolute left-0  -translate-y-1/2 bg-black text-white px-3 py-1 rounded shadow z-10"
        >
          ⬅
        </button>
        <button
          onClick={() => scroll(ref3, "right")}
          className="absolute right-0 -translate-y-1/2 bg-black text-white px-3 py-1 rounded shadow z-10"
        >
          ➡
        </button>

        <div className=" w-full mt-2 ">
          <div
            ref={ref3}
            className="flex overflow-x-auto scroll-smooth space-x-4 scrollbar-hide px-4"
          >
            {KayaSummer78?.map((item, index) => (
              <HoverSlideshowCard key={index} images={item.images} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeyondEast;
