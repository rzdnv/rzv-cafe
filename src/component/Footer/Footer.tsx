import { LogoBrandWhite } from "../../assets/logo";
import { ChevronRight } from "lucide-react";
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
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
  );
}
