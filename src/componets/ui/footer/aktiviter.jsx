// import { formatCurrency } from "@/util/currency";
import Image from "next/image";
import Link from "next/link";
export const metadata = {
    title: "Hjem"
}
export default async function Aktiviter({ kageperson }) {

    return (
        //vi klikker på linket så går ind i mappen kageperson/[kageslug] (som er "slug" i json filen(vi ku ogs hente id og vise ting ud fra det på details))
        <>
       
            <article className="aktiviteter"><Link href={`/aktiviteter/${kageperson.name}`}>
              
                
                <div>
                    <h3>
                        {kageperson.name}


                    </h3>
                    <p>{kageperson.minAge} - {kageperson.maxAge} år </p>
                </div>
                <Image src={kageperson.asset.url} alt="" width="430" height="360" quality={100} ></Image> </Link>
            </article></>
       
    )
} 