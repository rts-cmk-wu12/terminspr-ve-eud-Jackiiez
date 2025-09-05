import Image from "next/image";
import "../velkommen.scss"

import LoginForm from "@/componets/ui/loginComponent";

//login page
export default function login() {
  return (
    <div className="velkommen">
           
        <Image  src="/images/Baggrund.png" alt="" width="430" height="932" quality={100} priority={true} />
  <LoginForm/>
        </div>
  );
}
