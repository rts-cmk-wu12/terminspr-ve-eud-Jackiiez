import Image from "next/image";
import "./velkommen.scss"
import Link from "next/link";

export default function Home() {
  return (
    <div className="velkommen">
                <Image className="logo" src="/images/Logo.png" alt="" width="340" height="150" quality={100} priority={true} />
        <Image  src="/images/Baggrund.png" alt="" width="430" height="932" quality={100} priority={true} />
        <Link href={"/aktiviteter"}><div className="button" role="button">kom igang</div></Link>
        </div>
  );
}
