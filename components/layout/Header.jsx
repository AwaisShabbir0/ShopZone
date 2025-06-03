import { useState } from "react";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import Logo from "../ui/Logo";
import Search from "../ui/Search";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMenuModal, setIsMenuModal] = useState(false);
  const cart = useSelector((state) => state.cart);
  const router = useRouter();

  return (
    <div
      className={`h-[4rem] z-50 w-full fixed top-0 left-0 shadow-md backdrop-blur-md bg-gradient-to-r from-pink-400 to-yellow-300`}
    >
      <div className="container mx-auto flex justify-between items-center h-full px-2">
        <Logo />
        <nav
          className={`sm:static absolute top-0 left-0 sm:w-auto sm:h-auto w-full h-screen sm:text-black text-black sm:bg-transparent bg-white sm:flex hidden z-50 ${
            isMenuModal === true && "!grid place-content-center"
          }`}
        >
          <ul className="flex gap-x-2 sm:flex-row flex-col items-center">
            {[
              { name: "Home", path: "/" },
              { name: "Menu", path: "/menu" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/reservation" },
            ].map((item) => (
              <li
                key={item.name}
                className={`px-3 py-1 mx-1 text-sm rounded-full font-semibold transition-all duration-300 ${
                  router.asPath === item.path ? "bg-white text-yellow-500" : "bg-yellow-400 text-white hover:opacity-90"
                }`}
                onClick={() => setIsMenuModal(false)}
              >
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
          {isMenuModal && (
            <button
              className="absolute top-4 right-4 z-50"
              onClick={() => setIsMenuModal(false)}
            >
              <GiCancel size={25} className="transition-all" />
            </button>
          )}
        </nav>
        <div className="flex gap-x-4 items-center">
          <Link href="/auth/login">
            <span>
              {router.asPath.includes("auth") ? (
                <i
                  className={`fa-solid fa-right-to-bracket ${
                    router.asPath.includes("login") && "text-primary"
                  }`}
                ></i>
              ) : (
                <FaUserAlt
                  className={`hover:text-white transition-all cursor-pointer ${
                    router.asPath.includes("auth") || router.asPath.includes("profile")
                      ? "text-primary"
                      : ""
                  }`}
                />
              )}
            </span>
          </Link>
          <Link href="/cart">
            <span className="relative">
              <FaShoppingCart className="hover:text-white transition-all cursor-pointer" />
              <span className="w-4 h-4 text-xs grid place-content-center rounded-full bg-primary absolute -top-2 -right-3 text-black font-bold">
                {cart.products.length === 0 ? "0" : cart.products.length}
              </span>
            </span>
          </Link>
          <button onClick={() => setIsSearchModal(true)}>
            <FaSearch className="hover:text-white transition-all cursor-pointer" />
          </button>
          <a href="#" className="md:inline-block hidden sm">
            <button className="btn-primary">Order Online</button>
          </a>
          <button
            className="sm:hidden inline-block"
            onClick={() => setIsMenuModal(true)}
          >
            <GiHamburgerMenu className="text-xl hover:text-primary transition-all" />
          </button>
        </div>
      </div>
      {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
    </div>
  );
};

export default Header;
