"use server";
 
import { cookies } from "next/headers";
import z from "zod";
 
export default async function doTheLoginThing(prevState, formData) {
    const username = formData.get("username");
    const password = formData.get("password");
 
    const schema = z.object({
        username: z.string().min(1, { message: "Brugernavn skal være udfyldt" }),
        password: z.string().min(1, { message: "Adgangskode skal være udfyldt" })
    });
 
    const validated = schema.safeParse({
        username, password
    });
 
    if (!validated.success) return {
        ...validated,
        ...(z.treeifyError(validated.error))
    }
 
    const response = await fetch(`http://localhost:4001/users?username=${validated.data.username}`);
    const json = await response.json();
 
    if (!json.length) return {
        success: false,
        errors: ["Brugernavn eller adgangskode er forkert"]
    }
 
    if (json[0].password === validated.data.password) {
        const cookieStore = await cookies();
        cookieStore.set("hallojsovs", "Du er nu logget ind. Tillykke.", {
            maxAge: 60 * 30
        });
    }
 
    return validated;
}