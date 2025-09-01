import { formatCurrency } from "@/util/currency";
import Link from "next/link";
export const metadata={
    title:"Hjem"
}
export default async function Aktiviter({kageperson}) {

 return(
        //vi klikker på linket så går ind i mappen kageperson/[kageslug] (som er "slug" i json filen(vi ku ogs hente id og vise ting ud fra det på details))
           <Link href={`/`}>
            <article>
                <h2>
                    {kageperson.name}
                    <Image src={kageperson.asset.url}  alt="" width="430" height="500" quality={100} ></Image>
                </h2>

            </article>
        </Link>
    )
} 