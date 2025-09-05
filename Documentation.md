# Dokumentation for Landrup Dan (Terminsprøve)
# Jackie Hansen
## sådan kommer du igang
`npm i`
`npm run dev`
 
https://minadresse.dk/iplaymusic
jeg har lavet "valgfri" opgave B
 
 
 
 
# tech stack
* Nextjs, et front-end framework baseret på React.js......
* **React** Et bibliotek der giver mulighed for at lave compnenter
og håndtere states på en god og let måde. React har et kæmpe community
med et stort modul bibliotet som er aktivt, vel-dokomenteret og vel-understøttet.
det er også det mest brugte frontend-bibliotek i verden, så efterspørgelsen på react udviklere er stor
 
* **git** et versioncontrols værktøj(VCS) som lader mig lave branches og versioner
af min kode, så jeg let kan gå tilbage til tidligere versioner,
vis jeg for eksempel har lavet en fejl. jeg bruger git sammen med github
 

* **Sass**
En udvidelse til css, som lader mig lave funktioner,variabler, nesting og mixins
* **React icons**
et ikon-bibliotek som er beregnet på React.
 
* **Landrup dan API**
Et interface til at få adgang til Terminprøvens data, så
jeg kan lave min egen app. Man skal klone APIet ned fra github og derefter `npm i` og `npm run start` og så køre APIet på port 4000 hvor vi har en dokumentation
 
 
 
 
 
## code example
Src/actions/dotheloginthing.js
```jsx
"use server";




//side til at validere og lave cookies så sessionen husker at vi er logget ind
import { cookies } from "next/headers";
import z, { success } from "zod";

export default async function doTheLoginThing(prevState, formData) {
    //vi henter alt der er blevet tastet og postet i userfelterne
    const username = formData.get("username");
    const password = formData.get("password");
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const age = formData.get("age");
    const role = formData.get("role");

    //zod validering
    const schema = z.object({
        username: z.string().min(1, { message: "Brugernavn skal være udfyldt" }),
        password: z.string().min(1, { message: "Adgangskode skal være udfyldt" }),
        firstname: z.string().min(1, { message: "firstname skal være udfyldt" }),
        lastname: z.string().min(1, { message: "lastname skal være udfyldt" }),
        age: z.string().min(1, { message: "alder skal være udfyldt" }),
        role: z.string().min(1, { message: "role skal være udfyldt" })
    });

    const validated = schema.safeParse({
        username, password, firstname, lastname, age, role
    });

    if (!validated.success) return {
        ...validated,
        ...(z.treeifyError(validated.error))
    }


    //post request til at validere vores inputs for at få vores session/auth token fra apiet (/auth/login)

    const response = await fetch(`http://localhost:4000/api/v1/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",

        },
        body: new URLSearchParams({
            username: validated.data.username,
            password: validated.data.password,
            firstname: validated.data.firstname,
            lastname: validated.data.lastname,
            age: validated.data.age,
            role: validated.data.role,
        })

    });

    //fejlhåndtering
    if (!response.ok) {
        const errorText = await response.text();
        console.error("error response:", errorText)
        return {
            success: false,
            errors: ["fejl på server" + errorText]
        }
    }


    const json = await response.json();

//vis alt går godt får vi en cookie hvor vi gemmer session token som er kaldt (json)
    if (json && json.id) {
        const cookieStore = await cookies()
        cookieStore.set("Sådan", "Du er nu logget ind!", {
            maxAge: 60 * 30
        })
        return { success: true, user: json };
    }
    return {
        success: false,
        errors: ["brugeren kunne ik oprettes"],
    };


}
 
 
```
 
   vi henter info fra vores inputs igennem 2 post requests(den ene forgår  på loginComponent/index.jsx) hvor vi derefter validere med zod og fejlhåndtere. 
   vis alt går godt får vi en auth token fra apiet (/auth/login) som kommer igennem endpointet `http://localhost:4000/api/v1/users` hvor vi så får en cookie
   som går at vi kan gemme vores login/session og bruge det til at begrænse andre funktioner andre steder i vores applikation