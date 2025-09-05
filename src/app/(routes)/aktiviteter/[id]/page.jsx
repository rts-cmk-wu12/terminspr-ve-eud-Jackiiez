
// kode kommer fra gammelt projekt og stack overflow
import Image from "next/image";
import Link from "next/link";
import "../aktiviteter.scss"

export default async function AktiviterDetails({ params }) {
  const { id } = await params;
  console.log(id)
  const response = await fetch(`http://localhost:4000/api/v1/activities`)
  console.log(response)
  const json = await response.json()
  console.log(json)
  //vi bruger json.find til lave id om til et nummer fordi det starter med at være en string siden det kommer fra vores url params og så 
  //samligner vi dem så vi finder det rigtige item fra vores json call. det vil sige vi altid får det rigtige item i forhold til hvad vi har klikket på i vores url
  const activity = json.find(item => item.id === parseInt(id));


  return (<>
    <section className="details">
      <Image className="details__image" src={activity.asset.url} alt="" width="430" height="490" quality={100} ></Image>
      <Link href={"/"}  ><div role="button" className="details__button">Tilmeld dig</div></Link>
    </section>
    <section className="details__info">
      <h1>{activity.name}</h1>
      <h2>{activity.minAge} - {activity.maxAge}</h2>
      <h2>{activity.time}</h2>
      <h2>{activity.weekday}</h2>
      <p>{activity.description}</p>


    </section>
    


  </>
  )
}