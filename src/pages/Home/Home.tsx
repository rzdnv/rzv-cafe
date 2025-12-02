import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../../services/menu.service";
import { getReviews } from "../../services/review.service";
import type {
  // CartItem,
  MenuItem,
  ReviewItem,
} from "../../types/order";

// Gambar
import {
  CoffeLogo,
  LogoBrand,
  LogoBrandWhite,
  // LogoBrandBlack,
} from "../../assets/logo";
import { BG1BW } from "../../assets/BG";
import { Coffe3, Coffe7 } from "../../assets/coffe";
import {
  Gallery2,
  Gallery3,
  Gallery5,
  Gallery6,
  Gallery8,
  GalleryL1,
  GalleryL2,
  GalleryL3,
} from "../../assets/gallery";
import {
  almonddanish,
  americano,
  applepie,
  bluberrycake,
  blueberrymuffin,
  cafélatte,
  chaitealatte,
  cheesecake,
  cappuccino,
  chickenpesto,
} from "../../assets/menu";

// icon
import { Star, ChevronRight } from "lucide-react";
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";

// Heroui
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import { Avatar } from "@heroui/react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { label: "Home", path: "#home" },
    { label: "History", path: "#history" },
    { label: "Gallery", path: "#gallery" },
    { label: "Menu", path: "#menu" },
    { label: "Review", path: "#review" },
  ];

  const menuImages: Record<string, string> = {
    americano,
    cheesecake,
    bluberrycake,
    blueberrymuffin,
    cappuccino,
    applepie,
    almonddanish,
    chaitealatte,
    cafélatte,
    chickenpesto,
  };

  // GET : Menus
  const { data: menus } = useQuery({
    queryKey: ["menus"],
    queryFn: async () => {
      const result = await getMenu();
      return result.data;
    },
  });

  // cari nama menu
  const getItemName = (id: string) => {
    const itemFound = menus?.find((m: MenuItem) => m.id === id);
    return itemFound?.name ?? "Cappuccino";
  };

  // GET : Reviews
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const result = await getReviews();
      return result.data;
    },
  });

  return (
    <main className="">
      {/* Navbar Start */}
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="xl"
      >
        <NavbarContent className="md:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="md:hidden pr-3" justify="center">
          <NavbarBrand>
            <a href="#home" className="flex items-center gap-2">
              <img
                src={LogoBrand}
                alt="RZV Café Logo"
                className="w-10 h-10 object-contain"
              />
            </a>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-4" justify="center">
          <NavbarBrand>
            <a href="#home" className="flex items-center gap-2">
              <img
                src={LogoBrand}
                alt="RZV Café Logo"
                className="w-10 h-10 object-contain"
              />
            </a>
          </NavbarBrand>
          <NavbarItem>
            <a href="#home">Home</a>
          </NavbarItem>
          <NavbarItem>
            <a href="#history">History</a>
          </NavbarItem>
          <NavbarItem>
            <a href="#gallery">History</a>
          </NavbarItem>
          <NavbarItem>
            <a href="#menu">Menu</a>
          </NavbarItem>
          <NavbarItem>
            <a href="#review">Review</a>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="">
            <Link to="/login">
              <Button color="primary" variant="ghost">
                Login
              </Button>
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map(({ label, path }, idx) => (
            <NavbarMenuItem key={idx}>
              <a
                href={path}
                className="w-full"
                onClick={() => setIsMenuOpen(false)} // penting
              >
                {label}
              </a>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      {/* Navbar End */}

      {/* Hero Section Start */}
      <section id="home" className=" p-12 ">
        <div className="flex flex-col gap-8 max-w-full  md:px-14 rounded-3xl ">
          <div className="flex flex-col gap-4 md:flex-row ">
            {/* Left */}
            <div className="flex flex-1 w-full  justify-center">
              <img
                src={CoffeLogo}
                className="aspect-square w-3/4 object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col gap-4 w-full   justify-center ">
              <h1 className="text-6xl font-bold">
                Good Coffee. <br /> Good Mood.
              </h1>
              <p className="font-medium italic">
                "Sit back, sip your coffee, and enjoy a cozy moment that feels
                just right."
              </p>
              <Button size="md" color="primary" className="w-1/4">
                Order Now
              </Button>
            </div>
            {/* Right */}
          </div>
          <div className="flex justify-center md:justify-between p-4 md:p-2 md:mx-10  bg-gray-200  items-center rounded-full">
            <div className="flex gap-1 ml-2">
              <Star color="#1E293B" fill="#1E293B" />
              <Star color="#1E293B" fill="#1E293B" />
              <Star color="#1E293B" fill="#1E293B" />
              <Star color="#1E293B" fill="#1E293B" />
              <Star color="#1E293B" />
              <h2>
                Trusted by <span className="font-semibold">1000+</span> happy
                customers
              </h2>
            </div>
            <div className="gap-2 items-center hidden md:flex">
              <h2 className="font-medium">
                add your rating and be part of the community!
              </h2>
              <button className="rounded-full p-4 bg-slate-700">
                <ChevronRight color="white" />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section End */}

      {/* History */}
      <section
        id="history"
        className="p-28 my-12 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG1BW})` }}
      >
        <div className="w-1/2 flex flex-col gap-4">
          <h2 className="font-mono text-4xl font-bold">Our Story</h2>
          <p className="font-mono text-slate-950">
            RZV Café was created from a simple wish: to build a cozy space where
            people can slow down, enjoy good coffee, and feel at ease. What
            started as a small passion for handcrafted drinks grew into a
            comfortable corner that many choose as their favorite place to relax
            or focus.
          </p>
          <p className=" font-mono text-slate-950">
            From the beginning, the idea was never just about serving coffee —
            it was about creating a warm atmosphere that feels like a second
            home. A place to study, meet friends, unwind, or simply enjoy a
            quiet moment with your favorite drink.
          </p>
          <p className=" font-mono text-slate-950">
            Our commitment has remained the same since day one: <br />
            quality coffee,a comfortable space, and a mood that makes you want
            to stay just a little longer.
          </p>
          <p className=" font-mono text-slate-950 font-semibold">
            That spirit is what continues to shape RZV Café today.
          </p>
        </div>
      </section>
      {/* History End */}

      {/* Section Gallery */}
      <section id="gallery" className="p-12">
        <div className="font-mono grid grid-cols-2 gap-2 md:grid-cols-4 ">
          <div
            className=" text-xl font-semibold text-slate-900 
          col-start-1 row-start-1 flex md:col-start-1 md:row-start-1"
          >
            <h2 className="self-start md:self-center font-bold text-5xl">
              Our <br />
              Gallery
            </h2>
          </div>
          <div
            className=" text-xl font-semibold text-slate-900 
          flex md:col-start-2 md:row-start-2"
          >
            <h2 className="self-start md:self-center font-bold text-2xl">
              “Your cozy corner.”
            </h2>
          </div>
          <div
            className=" text-xl font-semibold text-slate-900 
          flex md:col-start-4 md:row-start-3 "
          >
            <h2 className="self-center font-bold text-2xl">
              “Gather, laugh, enjoy.”
            </h2>
          </div>
          <div
            className=" text-xl font-semibold text-slate-900 
          flex md:col-start-1 md:row-start-4"
          >
            <h2 className=" self-end font-bold text-2xl">
              “Life begins after coffee.”
            </h2>
          </div>
          <div
            className=" shadow-lg aspect-4/3 rounded-md col-start-2 row-start-1
          md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-2 md:row-start-1"
          >
            <img
              src={GalleryL3}
              alt="GalleryL3"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="  shadow-lg aspect-4/3 rounded-md col-start-1 row-start-2
          md:aspect-3/4 xl:aspect-4/3 overflow-hidden md:col-start-3 md:row-start-1"
          >
            <img
              src={Gallery2}
              alt="Gallery2"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="  shadow-lg aspect-4/3 rounded-md col-start-2 row-start-3
          md:aspect-3/4 xl:aspect-4/3 overflow-hidden md:col-start-4 md:row-start-4"
          >
            <img
              src={Gallery3}
              alt="Gallery3"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="  shadow-lg aspect-4/3 rounded-md hidden md:flex
          md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-1 md:row-start-2"
          >
            <img
              src={Coffe7}
              alt="Coffe7"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="  shadow-lg aspect-4/3 rounded-md hidden md:flex
          md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-3 md:row-start-2"
          >
            <img
              src={Gallery5}
              alt="Gallery5"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="  shadow-lg aspect-4/3 rounded-md hidden md:flex
          md:aspect-3/4 xl:aspect-4/3   overflow-hidden md:col-start-4 md:row-start-2"
          >
            <img
              src={Gallery6}
              alt="Gallery6"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="  shadow-lg aspect-4/3 rounded-md col-start-1 row-start-4
          md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-1 md:row-start-3"
          >
            <img
              src={Gallery8}
              alt="Gallery8"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="  shadow-lg aspect-4/3 rounded-md 
          md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-2 md:row-start-3"
          >
            <img
              src={GalleryL1}
              alt="GalleryL1"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="  shadow-lg aspect-4/3 rounded-md 
          md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-2 md:row-start-4"
          >
            <img
              src={Coffe3}
              alt="Coffe3"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="  shadow-lg aspect-4/3 rounded-md hidden md:flex
          md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-3 md:row-start-4"
          >
            <img
              src={GalleryL2}
              alt="GalleryL2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      {/* Section Gallery End */}

      {/* Menu Section */}
      <section id="menu" className="p-12 ">
        <div className="flex flex-col gap-4">
          <h2 className="font-mono text-4xl font-bold">Our Specials</h2>

          <div className="flex gap-4 rounded-lg p-2 overflow-x-auto scrollbar-hide ">
            {menus?.map((item: MenuItem) => {
              const key = item.name.toLowerCase().replace(/\s+/g, "");
              const imgSrc = menuImages[key];
              return (
                <div
                  key={item.id}
                  className="w-56 shrink-0 rounded-lg overflow-hidden outline-2 
                  bg-white outline-gray-200 shadow-lg hover:outline-almond-900"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-2 p-4 justify-between">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <h2 className="text-lg">${item.price}</h2>
                  </div>
                  <div className="p-4 pt-0">
                    <Button
                      color="primary"
                      type="button"
                      size="md"
                      className="w-full"
                    >
                      add to cart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Menu Section End */}

      {/* Reviews section */}
      <section id="review" className="p-12">
        <div className="flex flex-col gap-4">
          <h2 className="font-mono text-4xl font-bold">What People Say</h2>
          <div className="flex gap-4 p-4 overflow-x-auto scrollbar-hide">
            {reviews?.map((item: ReviewItem) => (
              <div
                key={item.id}
                className="flex flex-col p-5 w-96 h-64 shrink-0 rounded-lg border border-gray-200 shadow-md bg-white"
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <Avatar
                    size="md"
                    src={`https://avatar.iran.liara.run/public?username=${item.reviewer_name}`}
                  />
                  <h2 className="font-semibold text-lg">
                    {item.reviewer_name}
                  </h2>
                </div>

                {/* Comment box */}
                <div className="flex-1 overflow-y-auto text-base leading-relaxed my-1 bg-gray-100 p-3 rounded-md">
                  " {item.comment} ."
                </div>

                {/* Rating */}
                <div className="flex gap-2 items-center">
                  <p className="font-semibold">⭐ {item.rating}</p>
                  <p className="text-sm italic">
                    Ordered: {getItemName(item.menu_item_id)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Reviews section End */}

      {/* Footer Section */}
      <footer className="font-mono bg-almond-950 text-white pt-16 pb-8">
        <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {/* BRAND LOGO */}
          <div className="col-span-1">
            <a href="#home" className="flex items-center gap-2">
              <img
                src={LogoBrandWhite}
                alt="RZV Café Logo"
                className="w-3/4 object-contain"
              />
            </a>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#history">History</a>
              </li>
              <li>
                <a href="#gallery">Gallery</a>
              </li>
              <li>
                <a href="#menu">Menu</a>
              </li>
              <li>
                <a href="#review">Review</a>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Support</h3>
            <ul className="space-y-2">
              <li>FAQ</li>
              <li>Returns & Exchanges</li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Join Our Email List</h3>
            <p className="text-sm text-gray-200 mb-4">
              Stay updated with all the latest products and exciting offers.
            </p>

            <div className="flex items-center bg-white rounded-full overflow-hidden p-2 mb-6">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-slate-950 text-base placeholder:text-slate-600"
              />
              <button className="px-4 text-slate-600 hover:text-almond-950 transition duration-200">
                <ChevronRight size={22} />
              </button>
            </div>

            <div className="flex mt-6 items-center gap-4 text-white text-4xl">
              <FaInstagram className=" hover:text-pink-500 cursor-pointer" />
              <FaFacebook className=" hover:text-blue-500 cursor-pointer" />
              <FaTiktok className=" hover:text-gray-600 cursor-pointer" />
              <FaYoutube className=" hover:text-red-500 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-10 pt-4 text-center text-sm">
          © 2025 RZV.café | All Rights Reserved
        </div>
      </footer>
      {/* Footer Section End */}
    </main>
  );
};

export default Home;
