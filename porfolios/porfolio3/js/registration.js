function validation(){
    if(document.Formfill.Username.value==""){
        document.getElementById("result").innerHTML="Ingresar Usuario*";
        return false;
    }
    else if(document.Formfill.Username.value.length < 6){
        document.getElementById("result").innerHTML="Mínimo 6 caracteres*";
        return false;
    }
    else if(document.Formfill.Email.value==""){
        document.getElementById("result").innerHTML="Ingresa tu correo*";
        return false;
    }
    else if(document.Formfill.Password.value==""){
        document.getElementById("result").innerHTML="Ingresa tu contraseña";
        return false;
    }
    else if(document.Formfill.Password.value.length<6){
        document.getElementById("result").innerHTML="Debe ingresar 6 digitos";
        return false;
    }
    
    else if(document.Formfill.CPassword.value==""){
        document.getElementById("result").innerHTML="Confirma tu contraseña";
        return false;
    }

    else if(document.Formfill.Password.value!==document.Formfill.CPassword.value){
        document.getElementById("result").innerHTML="La contraseña no es correcta";
        return false;
    }
    else if(document.Formfill.CPassword.value==document.Formfill.Password.value){
        popup.classList.add("open-slide")
        return false;
    }
}
/**Remover open-slide */
var popup=document.getElementById('popup');

function closeSlide(){
    popup.classList.remove('open-slide')
}