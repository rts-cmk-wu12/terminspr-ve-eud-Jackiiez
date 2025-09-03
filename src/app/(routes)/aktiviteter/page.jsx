import Aktivitet from "@/componets/ui/footer/aktiviter";
import "./aktiviteter.scss"
export const metadata={
    title:"home"
}
export default async function Home() {

  const response = await fetch("http://localhost:4000/api/v1/activities");
  const json = await response.json();
  console.log(json)
     return (

    <>
     <h2 className="aktiviteter-heading">Aktiviteter</h2>
      {json.map(kageperson =>

        <div key={kageperson.weekday}>
          {/* vi henter vores kort hvor vi har en property som hedder "kageperson" og giver den det samme parameter så vi viser alt indholdet fra kortet */}
          <Aktivitet kageperson={kageperson} />
        </div>)}
    </>
  );
}
