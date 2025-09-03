import { IoHomeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import "./footer.scss";
import Link from "next/link";
export default function Footer() {
  return (
   <footer>
    <ul>
        
        <Link href={"/"}><li><IoHomeOutline /></li></Link>
       <Link href={"/search"}> <li><CiSearch /></li></Link>
       <Link href={"/calendar"}> <li><CiCalendar /></li></Link>
    </ul>
   </footer>
  );
}
