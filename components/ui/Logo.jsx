import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/logo.png"
        alt="ShopZone Logo"
        width={160}
        height={100}
        priority
        className="contrast-150 drop-shadow-md"
      />
    </Link>
  );
};

export default Logo;
