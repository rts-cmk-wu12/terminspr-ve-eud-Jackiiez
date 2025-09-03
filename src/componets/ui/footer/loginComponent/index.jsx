"use client";
 
import doTheLoginThing from "@/actions/do-the-login-thing";
import { useActionState } from "react";
import { CircleLoader } from "react-spinners";
 
const override = {
    display: "block",
    margin: "0 auto",
}
 
export default function LoginForm() {
    const [formState, formAction, isPending] = useActionState(doTheLoginThing);
 
    return isPending ? (
        <CircleLoader
            color="#0d0d7cff"
            loading={true}
            cssOverride={override}
            size={100}
        />
    ) : (
        <form action={formAction}>
            <div>
                <label>
                    <span>Brugernavn</span>
                    <input type="text" name="username" />
                    <p>{formState?.properties?.username?.errors}</p>
                </label>
            </div>
            <div>
                <label>
                    <span>Adgangskode</span>
                    <input type="password" name="password" />
                    <p>{formState?.properties?.password?.errors}</p>
                </label>
            </div>
            <button type="submit">Log ind</button>
            <p>{formState?.errors}</p>
        </form>
    );
}