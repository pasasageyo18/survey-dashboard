"use client";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, Link } from "@nextui-org/react";
import Image from "next/image";

export default function NavbarSect() {
  return (
    <Navbar position="static" maxWidth="2xl" className="shadow-md">
      <NavbarContent>
        <NavbarBrand>
          <Link href="/">
            <Image
              src="/assets/logo.png"
              width={80}
              height={24}
              alt="logo.png"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>
    </Navbar>
  );
}
