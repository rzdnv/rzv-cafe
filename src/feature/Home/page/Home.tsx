import React from "react";
import { Link } from "react-router-dom";

// Component
import Hero from "../component/Hero";
import History from "../component/History";
import Gallery from "../component/Gallery";
import Menu from "../component/MenuSection";
import Review from "../component/ReviewsSection";
import Footer from "../component/Footer";
// ------------------

// Gambar
import { LogoBrand } from "../../../assets/logo";

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

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { label: "Home", path: "#home" },
    { label: "History", path: "#history" },
    { label: "Gallery", path: "#gallery" },
    { label: "Menu", path: "#menu" },
    { label: "Review", path: "#review" },
  ];

  return (
    <main className="font-mono">
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
      <Hero />
      <History />
      <Gallery />
      <Menu />
      <Review />
      <Footer />
    </main>
  );
};

export default Home;
