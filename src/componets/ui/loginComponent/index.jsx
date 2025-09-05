"use client";
 
import doTheLoginThing from "@/actions/dotheloginthing";
import { useActionState } from "react";

import "./login.scss"
import { success } from "zod";

 
const override = {
    display: "block",
    margin: "0 auto",
}
 


//funktion til at registrere en bruger med en post request med nedståene info som bliver tastet ind i inputsne
async function registrerBruger(formData) {
    const response = await fetch("http://localhost:4000/api/v1/users", {
        method:"POST",
        headers:{ "Content-Type":"application/x-www-form-urlencoded",

        },body: new URLSearchParams(formData).toString(),
    });
 

const responseData= await response.json();
console.log("parsed data", responseData)
return responseData
 }   


 //håndtering af registrering og login
async function handleRegister(state, formData){
const username = formData.get("username");
const password = formData.get("password");
const firstname = formData.get("firstname");
const lastname = formData.get("lastname");
const age = formData.get("age");
const role = formData.get("role");

if(role !== "Default"){
    return{
        success: false,
        errors:["rolle skal være default"],
    };
}

console.log({username,password,firstname,lastname,age,role})

const registerResponse= await registrerBruger({
username,password,firstname,lastname,age,role
})


//check om registrering var succesfuld
if(registerResponse && registerResponse.id){
    const loginresponse = await doTheLoginThing(state, formData)
    return loginresponse;
}
//error vis noget gik galt
return{
    success: false,
    errors: ["Registrering fejlede","uventet svar" ],
};
}



//component for loginformen
export default function LoginForm() {

    //status for loading osv
    const [formState, formAction, isPending] = useActionState(handleRegister);
 
    return isPending ? (
    <>loading</>
    ) : (

        
        <form className="loginform" action={formAction}>
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
             <div>
                <label>
                    <span>Navn</span>
                    <input type="text" name="firstname" />
                    <p>{formState?.properties?.firstname?.errors}</p>
                </label>
            </div>
             <div>
                <label>
                    <span>Efternavn</span>
                    <input type="text" name="lastname" />
                    <p>{formState?.properties?.lastname?.errors}</p>
                </label>
            </div>
             <div>
                <label>
                    <span>Alder</span>
                    <input type="text" name="age" />
                    <p>{formState?.properties?.age?.errors}</p>
                </label>
            </div>
             <div>
                <label>
                    <span>Rolle</span>
                    <input type="text" name="role" placeholder="Default" />
                    <p>{formState?.properties?.role?.errors}</p>
                </label>
            </div>

            <button type="submit">Log ind</button>
            <p>{formState?.errors}</p>
        </form>
    );
}