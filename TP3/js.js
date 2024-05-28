let textarea = document.getElementById("inputComment");
let btnContinue = document.getElementById("continueButton");
let btnSubmit = document.getElementById("sendButton");
let btnBack = document.getElementById("backButton");
let inputSearch = document.getElementById("inputProfile");
let searchDiv = document.getElementById("searchDiv");

//mensajes de error
let profileError = document.getElementById("profileError");
let checkboxError = document.getElementById("checkboxError");

let nameError = document.getElementById("nameError");
let surnameError = document.getElementById("surnameError");
let contactError = document.getElementById("contactError");
let phoneError = document.getElementById("phoneError");
let emailError = document.getElementById("emailError");


let checkboxes = document.querySelectorAll(".checkboxes input");
let validEmail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
let onlyNumbers = new RegExp("^[0-9]+$");
let form1 = document.getElementById("formPage1");
let form2 = document.getElementById("formPage2");
let finalForm = new FormData();

let mockDatabase = [];

function loadDatabase(){
    mockDatabase = [
        {
            "name":"Ezequiel",
            "id": 333
        },
        {
            "name":"Juan",
            "id": 5
        },
        {
            "name":"Maria",
            "id": 7
        },
        {
            "name":"Carla",
            "id": 760
        },
        {
            "name":"Griselda",
            "id": 412
        },
        {
            "name":"Rigoberto",
            "id": 999
        },
        {
            "name":"Ana",
            "id": 10
        },
        {
            "name":"Testeando 1",
            "id": 501
        },
        {
            "name":"Testeando 1",
            "id": 25
        },
        {
            "name":"Testeando 1",
            "id": 871
        },
        {
            "name":"Walter",
            "id": 2
        },
        {
            "name":"Testeando 1",
            "id": 57
        },
        {
            "name":"Testeando 2",
            "id": 21
        },
        {
            "name":"Testeando 3",
            "id": 54
        },
        {
            "name":"Testeando 2",
            "id": 51
        },
        {
            "name":"Testarudo 1",
            "id": 451
        },
        {
            "name":"Testarudo 2",
            "id": 20
        },
        {
            "name":"Testaruda 1",
            "id": 985
        },
        {
            "name":"Torticolis",
            "id": 154
        },
        {
            "name":"Anda",
            "id": 182
        },
    ];
}
function filterFunction() {
    let suggestions = getMatches(inputSearch.value);

    let profileSuggestions = document.createElement("ul");      //lista donde se van a poner los perfiles que coinciden con la busqueda
    profileSuggestions.id="profiles";

    searchDiv.lastChild.remove();                               //se saca la lista anterior
    searchDiv.appendChild(profileSuggestions);                  //se agrega la nueva que va a tener los perfiles actualizados con la ultima busqueda
    for (const profile of suggestions) {
        let option = document.createElement("li");
        option.value = profile.id;
        option.innerHTML = profile["name"];
        option.addEventListener("click",(e)=>{                   //cada item de la lista tiene su eventlistener para agregar los datos al input

            lastProfileChosen = e.target.innerHTML;
            hideProfiles();                                     //y se esconde la lista de todos los perfiles cuando se selecciono uno
        });
        profileSuggestions.appendChild(option);
    }
}

function hideProfiles(e){                                   //oculta la lista donde aparecen los perfiles que coinciden con la busqueda
    inputSearch.value=lastProfileChosen;
    let profileSuggestions = document.getElementById("profiles");
    profileSuggestions.classList.add("hidden");
}
function getMatches(string){ //simulacion de peticion a una base de datos
    let array = [];
    if(!isEmpty(string)){
        for (const profile of mockDatabase) {
            if(matches(profile,string)){
                array.push(profile);
            }
        }

    }
    return array;
}

function matches(profile,string){
    if(profile.name.toLowerCase().startsWith(string.toLowerCase())){
        return true;
    }
    return false;
}

let lastProfileChosen ="";

function checkForm1(formData){
    let valid = true;

    //reset warnings
    profileError.innerHTML = ""
    checkboxError.innerHTML = "" 
    commentError.innerHTML = "";

    //el id de perfil es un numero
    if(isEmpty(formData.get("profile"))){
        profileError.innerHTML = "Este campo es obligatorio"
        valid = false;
    }  

    let checkboxPressed = false;
    for (const checkboxInput of checkboxes) {
        if(formData.has(checkboxInput.name)){
            checkboxPressed = true;
            break;
        }
    }   

    
    if(!checkboxPressed){
        valid = false;
        checkboxError.innerHTML = "Elija al menos un motivo";
    }else{
        if(isEmpty(formData.get("comment"))){  //se checkeo el motivo "otro" pero no se especifico
            commentError.innerHTML = "Especifique el motivo que quiere reportar";
            valid = false;
        }
    }
    //fijarse si algun otro checkbox esta clickeado


    return valid;    
}

function checkForm2(formData){
    let valid = true;
    //reset warnings
    nameError.innerHTML = "";
    surnameError.innerHTML ="";
    phoneError.innerHTML ="";
    emailError.innerHTML ="";
    contactError.innerHTML="";

    //nombre contiene solo letras y ' o -
    if(isEmpty(formData.get("name"))){
        nameError.innerHTML = "Este campo es obligatorio"
        valid = false;
    }else{
        if(!validName.test(formData.get("name"))){              //testeo de validez de nombre con regex
            nameError.innerHTML = "Solo usar guion, apostrofe o letras sin tilde";
            valid = false;
        }
    }

    //apellido contiene solo letras y ' o -
    if(isEmpty(formData.get("surname"))){
        surnameError.innerHTML = "Este campo es obligatorio"
        valid = false;
    }else{
        if(!validName.test(formData.get("surname"))){
            surnameError.innerHTML = "Solo usar guion, apostrofe o letras sin tilde";
            valid = false;
        }
    }

    let contactInfo = false;
    let contactEmpty = true;
    if(!isEmpty(formData.get("phone"))){     
        contactEmpty = false;           //hay numeor de telefono
        if(onlyNumbers.test(formData.get("phone"))){    //y es valido
            contactInfo = true;                         //la informacion de contacto es suficiente para el form
        }else{
            phoneError.innerHTML = "Numero telefonico invalido";
        }
    }

    if(!isEmpty(formData.get("email"))){    //hay mail
        contactEmpty = false;                
        if(validEmail.test(formData.get("email"))){    //y es valido
            contactInfo = true;                         //la informacion de contacto es suficiente para el form
        }else{
            emailError.innerHTML = "Email invalido";
        }
    }

    if(!contactInfo){
        valid = false;  //si no hay contacto valino no es valido el formulario
        if(contactEmpty){  //es invalido porque no se ingreso ningun contacto
            contactError.innerHTML="Ingrese al menos un metodo de contacto valido"
        }
    }
    return valid;
}

function isEmpty(string){
    string.trim();
    if(string.length === 0 || string === null){
        return true;
    }
    return false;
}

async function submit(formdata,url ="https://www.url.com/post"){  //submit del form una vez este completo

    /*
    try {
        const response = await fetch(url, {
          method: "POST",
          // Set the FormData instance as the request body
          body: formdata,
        });
        await response.json();
      } catch (e) {
    }*/

}
let validName = new RegExp("^[a-zA-Z'-]+$"); // de principio a fin tiene solo: ',- o letras entre a y z y A y Z

btnContinue.addEventListener("click",(e)=>{                     
    e.preventDefault();
    let formdata = new FormData(form1);
    if(checkForm1(formdata)){                       //si los datos de la primera parte son correctos se agregan al formdata que se va a enviar 
        for (const iterator of formdata.entries()) {        
            if(!isEmpty(iterator[1])){
                finalForm.set(iterator[0],iterator[1]);

            }
        }
        form2.classList.remove("hidden");
        form1.classList.add("hidden");
    }
});

btnSubmit.addEventListener("click",(e)=>{              
    e.preventDefault();
    let formdata = new FormData(form2);
    
    if(checkForm2(formdata)){                           //si los datos de la segunda parte son correctos se agregan al formdata que se va a envia
        for (const iterator of formdata.entries()) {
            if(!isEmpty(iterator[1])){
                finalForm.set(iterator[0],iterator[1]);
            }
        }
        submit(formdata,"https://facebook.com/api/report");     //se envia el form
        form1.remove();
        form2.remove();
    
        let submitMessage = document.createElement("p");
        submitMessage.innerHTML="Gracias por su colaboracion, nuestro equipo evaluara el reporte y se pondra en contacto de ser necesario."
        submitMessage.classList.add("submitMessage");
        document.body.appendChild(submitMessage);
    }

});

inputSearch.addEventListener("input",(e)=>{ //muestra una lista donde se pueden buscar perfiles
    filterFunction();
});

inputSearch.addEventListener("focusout",(e)=>{
    setTimeout(hideProfiles,100);                    //timeout para que se dispare el evento de click en la lista antes que desaparesca
});

btnBack.addEventListener("click",(e)=>{             //para volver a la primera parte del formulario
    e.preventDefault();
    form1.classList.remove("hidden");
    form2.classList.add("hidden");
});

textarea.addEventListener("input",(e)=>{                    //si se esta escribiendo en el comentario se va agrandando para ver mas texto
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
});

textarea.addEventListener("focusin",(e)=>{
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
})
textarea.addEventListener("focusout",(e)=>{                 //una vez que se dejo de escribir el comentario se achica el input para que no ocupe toda la pantalla
    textarea.style.height = "auto";
});

loadDatabase();