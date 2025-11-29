import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../../../services/menu.service";
import { getReviews } from "../../../services/review.service";
import type {
  // CartItem,
  MenuItem,
  ReviewItem,
} from "../../../types/order";

// Gambar
import { coffeLogo } from "../../../assets/logo";
import { BG1BW } from "../../../assets/BG";
import { Coffe3, Coffe7 } from "../../../assets/coffe";
import {
  Gallery2,
  Gallery3,
  Gallery5,
  Gallery6,
  Gallery8,
  GalleryL1,
  GalleryL2,
  GalleryL3,
} from "../../../assets/gallery";
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
} from "../../../assets/menu";

// icon
import { Star, ChevronRight } from "lucide-react";

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
    { label: "Profile", path: "/profile" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Activity", path: "/activity" },
    { label: "Log Out", path: "/logout" },
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

  // GET : Menu by ID

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
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <p className="text-2xl font-bold text-inherit">RZV Café</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <p className="text-2xl font-bold text-inherit">RZV Café</p>
          </NavbarBrand>
          <NavbarItem>
            <Link className="hover:text-red-600 text-base " to="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="hover:text-red-600 text-base " to="/">
              All Menu
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link to="/login">
              <Button color="primary">Login</Button>
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map(({ label, path }, idx) => (
            <NavbarMenuItem key={idx}>
              <Link
                to={path}
                className="w-full"
                onClick={() => setIsMenuOpen(false)} // penting
              >
                {label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      {/* Navbar End */}

      {/* Hero Section Start */}
      <section id="home" className=" p-12 ">
        <div className="flex flex-col gap-8 max-w-full  px-14 rounded-3xl ">
          <div className="flex ">
            {/* Left */}
            <div className="flex flex-1 w-full  justify-center ">
              <img
                src={coffeLogo}
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
          <div className="flex justify-between p-2 mx-10  bg-gray-200  items-center rounded-full">
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
            <div className="flex gap-2 items-center">
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
          <div className=" text-xl font-semibold text-slate-900 md:flex md:col-start-1 md:row-start-1">
            <h2 className="md:self-center font-bold text-5xl">
              Our <br />
              Gallery
            </h2>
          </div>
          <div className=" text-xl font-semibold text-slate-900 md:flex md:col-start-2 md:row-start-2">
            <h2 className="md:self-center font-bold text-2xl">
              “Your cozy corner.”
            </h2>
          </div>
          <div className=" text-xl font-semibold text-slate-900 md:flex md:col-start-4 md:row-start-3 ">
            <h2 className="md:self-center font-bold text-2xl">
              “Gather, laugh, enjoy.”
            </h2>
          </div>
          <div className=" text-xl font-semibold text-slate-900 md:flex md:col-start-1 md:row-start-4 ">
            <h2 className="md:self-center font-bold text-2xl">
              “Life begins after coffee.”
            </h2>
          </div>
          <div className=" shadow-lg aspect-4/3 rounded-md md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-2 md:row-start-1">
            <img
              src={GalleryL3}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="  shadow-lg aspect-4/3 rounded-md md:aspect-3/4 xl:aspect-4/3 overflow-hidden md:col-start-3 md:row-start-1">
            <img src={Gallery2} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="  shadow-lg aspect-4/3 rounded-md md:aspect-3/4 xl:aspect-4/3 overflow-hidden md:col-start-4 md:row-start-4">
            <img src={Gallery3} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="  shadow-lg aspect-4/3 rounded-md md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-1 md:row-start-2">
            <img src={Coffe7} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="  shadow-lg aspect-4/3 rounded-md md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-3 md:row-start-2">
            <img src={Gallery5} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="  shadow-lg aspect-4/3 rounded-md md:aspect-3/4 xl:aspect-4/3   overflow-hidden md:col-start-4 md:row-start-2">
            <img src={Gallery6} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="  shadow-lg aspect-4/3 rounded-md md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-1 md:row-start-3">
            <img src={Gallery8} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="  shadow-lg aspect-4/3 rounded-md md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-2 md:row-start-3">
            <img
              src={GalleryL1}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="  shadow-lg aspect-4/3 rounded-md md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-2 md:row-start-4">
            <img src={Coffe3} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="  shadow-lg aspect-4/3 rounded-md md:aspect-3/4 xl:aspect-4/3  overflow-hidden md:col-start-3 md:row-start-4">
            <img
              src={GalleryL2}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      {/* Section Gallery End */}

      {/* Shop Section */}
      {/* <section id="shop" className="p-12">
        <div className="flex flex-col gap-4">
          <h2 className="font-mono text-4xl font-bold">Menus</h2>
          <div className="flex gap-2 overflow-x-auto">
            {menus?.map((item: MenuItem) => {
              const key = item.name.toLowerCase().replace(/\s+/g, "");
              const imgSrc = menuImages[key];
              return (
                <div id={item.id} className="w-96 border">
                  <div className="aspect-square">
                    <img
                      src={imgSrc}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-2">
                    <h2>{item.name}</h2>
                    <h2>{item.price}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}
      <section id="shop" className="p-12">
        <div className="flex flex-col gap-4">
          <h2 className="font-mono text-4xl font-bold">Menus</h2>

          <div className="flex gap-4 p-4 overflow-x-auto scrollbar-hide">
            {menus?.map((item: MenuItem) => {
              const key = item.name.toLowerCase().replace(/\s+/g, "");
              const imgSrc = menuImages[key];
              return (
                <div
                  key={item.id}
                  className="w-56 shrink-0 rounded-lg overflow-hidden outline-2 outline-gray-200 shadow-lg"
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
      {/* Shop Section End */}

      {/* Reviews section */}
      <section id="reviews" className="p-12">
        <div className="flex flex-col gap-4">
          <h2 className="font-mono text-4xl font-bold">What People Say</h2>
          <div className="flex gap-4 p-4 overflow-x-auto scrollbar-hide">
            {reviews?.map((item: ReviewItem) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 p-5 w-80 h-60 shrink-0 rounded-lg border border-gray-200 shadow-md bg-white"
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
                <div className="flex-1 overflow-y-auto text-justify text-base leading-relaxed bg-gray-50 p-3 rounded-md">
                  " {item.comment} ."
                </div>

                {/* Rating */}
                <div>⭐ {item.rating}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Reviews section End */}

      <div className="h-96"></div>
    </main>
  );
};

export default Home;
