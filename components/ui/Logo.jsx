import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <span className="text-[2rem]   cursor-pointer">
        <b>ShopZone</b> 
      </span>
    </Link>
  );
};

export default Logo;
