/*
*Descrizione*
Attraverso l'apposita API di Boolean
https://flynn.boolean.careers/exercises/api/random/mail
generare 10 indirizzi email e stamparli in pagina all'interno di una lista.
*Bonus*
- Abbellire con CSS o Bootstrap
- Inserire un bottone che al click faccia il fetch altre 10 mail (sostituendo le altre)
*/

// const String
const countForLoop = 10;
const classCol_3 = " col-lg-4";
const classCol_6 = " col-md-6";
const classCol_12 = " col-12";
const padtb = " py-3";
const LiArray = [];
const liTextArray = [];


//i had to add this eventListener or the axios.Get never reached for DOM ul, in this way i wait all the document is loaded and then i do the fetch
document.addEventListener("DOMContentLoaded", () => {
    const eleUlDom = document.getElementById("ulList");

    //call the first email fetch
    GetEmailApi();

    //function to create DOM li
    function CreateLiDom(value) {

        const eleLiDom = document.createElement("li");
        eleLiDom.classList.add(classCol_3.trim(), classCol_6.trim(), classCol_12.trim(), padtb.trim());

        eleLiDom.innerText = `${value}`;

        LiArray.push(eleLiDom);

        eleUlDom.appendChild(eleLiDom);
    }


    //Fetch BTN
    const btnFetchEmail = document.getElementById("btnFetch");

    btnFetchEmail.addEventListener("click", (event) => {
        event.stopPropagation();

        //empty array
        if (liTextArray.length > 1) {
            const varTemp = liTextArray.length;
            for (let i = varTemp - 1; i >= 0; i--) {
                LiArray.splice(i, 1);
                liTextArray.splice(i, 1);
            }
        }
        eleUlDom.innerHTML = "";
        GetEmailApi();
        console.clear();
    });

    function GetEmailApi() {
        for (let i = 0; i < countForLoop; i++) {
            axios.get("https://flynn.boolean.careers/exercises/api/random/mail").then((response) => {
                const valueEmail = response.data.response;
                liTextArray.push(valueEmail);
                CreateLiDom(valueEmail);
                console.log(valueEmail);
            }).catch((error) => {
                console.log(error);
            });
        }
    }
});