"use server";

//kode brugt fra tidlere projekt og youtube videoer og stackoverflow


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