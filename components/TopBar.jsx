import Link from "next/link";
import Image from "next/image";
import NavbarSect from "./Navbar";
function TopBar() {
  return (
    <div className="fixed top-0 z-30 flex w-full border-b border-b-slate-50/10">
      <NavbarSect />
    </div>
  );
}

export default TopBar;
