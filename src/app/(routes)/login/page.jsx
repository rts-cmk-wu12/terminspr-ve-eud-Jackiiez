import Image from "next/image";
import "../velkommen.scss"


export default function login() {
  return (
    <div className="velkommen">
           
        <Image  src="/images/Baggrund.png" alt="" width="430" height="932" quality={100} priority={true} />
  
        </div>
  );
}
