

import Image from "next/image";
import Link from "next/link";
import "../aktiviteter.scss"

export default async function KageDetails({ params }) {
    const { name } = await params;
    const response = await fetch(`http://localhost:4000/api/v1/activities?id=${name}`)
    const json = (await response.json())[name];
    console.log(json)
    return (<>
        <section className="details">
            <Image className="details__image" src={json.asset.url} alt="" width="430" height="490" quality={100} ></Image>
          <Link href={"/"}  ><div role="button" className="details__button">Tilmeld dig</div></Link>
        </section>
  {json.name}

    </>
    )
}