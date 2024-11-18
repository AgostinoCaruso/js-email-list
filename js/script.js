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
const classCol_3 = " col-xl-4";
const classCol_6 = " col-md-6";
const classCol_12 = " col-sm-12";
const classFadeIn = " fade-in";
const classFadeInOpacity = " liEleFadeIn";
const padtb = " py-3";
const LiArray = [];
const liTextArray = [];

let flag = false;

//i had to add this eventListener or the axios.Get never reached for DOM ul, in this way i wait all the document is loaded and then i do the fetch
document.addEventListener("DOMContentLoaded", () => {
    const eleUlDom = document.getElementById("ulList");
    const elePDom = document.querySelector("p");

    //call the first email fetch
    // GetEmailApi();

    //function to create DOM li
    function CreateLiDom(value) {

        const eleLiDom = document.createElement("li");
        eleLiDom.classList.add(classCol_3.trim(), classCol_6.trim(), classCol_12.trim(), padtb.trim(),classFadeIn.trim());
        const eleSpanDom = document.createElement("span");

        eleSpanDom.innerText = `${value}`;
        eleLiDom.appendChild(eleSpanDom);

        LiArray.push(eleLiDom);

        setTimeout(() => {
            eleLiDom.classList.add(classFadeInOpacity.trim()); // Attiva l'effetto fade-in
        }, 10); // Piccolo ritardo per garantire che la transizione venga applicata
        eleUlDom.appendChild(eleLiDom);
    }


    //Fetch BTN
    const btnFetchEmail = document.getElementById("btnFetch");

    btnFetchEmail.addEventListener("click", (event) => {
        event.stopPropagation();

        elePDom.classList.remove("my-d-none");

        let countTimer = 0;
        const loadingTime = setInterval(() => {
            elePDom.innerText += ".";
            if (liTextArray.length == countForLoop) {
                clearInterval(loadingTime);
                elePDom.classList.add("my-d-none");
                elePDom.innerText = "Loading";
            }
        }, SetMStoSeconds(0.2));

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
                if (liTextArray.length == countForLoop) {
                    for (let i = 0; i < liTextArray.length; i++) {
                        CreateLiDom(liTextArray[i]);
                    }
                }
                console.log(valueEmail);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

});

function SetMStoSeconds(num) {
    return num * 1000;
}