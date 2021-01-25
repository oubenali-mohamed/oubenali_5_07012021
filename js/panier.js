document.getElementById('image').innerHTML = localStorage.getItem('image');
document.getElementById('nom').innerHTML = localStorage.getItem('nom');
document.getElementById('prix').innerHTML = localStorage.getItem('prix');
document.getElementById('quantite').innerHTML = localStorage.getItem('quantite');

let formValid = document.getElementById("button");
formValid.addEventListener('click', function(e) {
    let formInvalid = "";
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let addresse = document.getElementById("addresse").value;
    let ville = document.getElementById("ville").value;
    let email = document.getElementById("mail").value;
    if (/[0-9]/.test(prenom) || /[§!@#$%^&*().?":{}|<>]/.test(prenom)){
      formInvalid += "Votre prénom est invalide \n";
    }
    if (/[0-9]/.test(nom) || /[§!@#$%^&*().?":{}|<>]/.test(nom)){
      formInvalid += "Votre nom de famille est invalide \n";
    }
     if (!(addresse)) {
      formInvalid += "Votre adresse est invalide \n";
    }
    if (/[0-9]/.test(ville)) {
      formInvalid += "Votre ville est invalide \n";
    }
    if (!/@/.test(email)) {
      formInvalid += "Votre mail est invalide \n";
    }
    if (formInvalid) {
      e.preventDefault()
      alert("Erreur : \n" + formInvalid);
    }
});

