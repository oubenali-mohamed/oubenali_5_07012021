/* récupération du localStorage si le panier n'est pas vide
 sinon redirection à la page d'acceuil si le panier est vide */
let panierLocalStorage = localStorage.getItem("panier");
if (panierLocalStorage == null) {
  alert("panier vide");
  window.location.href = "index.html";
} else {
  panierLocalStorage = JSON.parse(panierLocalStorage);
  // récapitulatif du produit dans un tableau HTML
  for (let i = 0; i < panierLocalStorage.length; i++) {
    document.getElementById("nomArticle").innerHTML +=
      panierLocalStorage[i].nom + " </br>";
    document.getElementById("prix").innerHTML +=
      panierLocalStorage[i].prix / 100 + " € </br>";
    document.getElementById("quantite").innerHTML +=
      panierLocalStorage[i].quantite + " </br>";
    document.getElementById("prixTotal").innerHTML +=
      panierLocalStorage[i].prixTotal / 100 + " € </br> ";
  }
}
// vérification des entrées du formulaire avec les regex
let formValid = document.getElementById("button");
formValid.addEventListener("click", function (e) {
  e.preventDefault();
  let formInvalid = "";
  let prenom = document.getElementById("prenom").value;
  let nom = document.getElementById("nom").value;
  let addresse = document.getElementById("addresse").value;
  let ville = document.getElementById("ville").value;
  let email = document.getElementById("mail").value;
  
  if (/[0-9]/.test(prenom) || /[§!@#$%^&*().?":{}|<>]/.test(prenom)) {
    formInvalid += "Votre prénom est invalide \n";
  } 
  if (/[0-9]/.test(nom) || /[§!@#$%^&*().?":{}|<>]/.test(nom)) {
    formInvalid += "Votre nom de famille est invalide \n";
  }
  if (!addresse) {
    formInvalid += "Votre adresse est invalide \n";
  }
  if (/[0-9]/.test(ville)) {
    formInvalid += "Votre ville est invalide \n";
  }
  if (!/@/.test(email)) {
    formInvalid += "Votre mail est invalide \n";
  }
  if (formInvalid) {
    alert("Erreur : \n" + formInvalid);
  } else {
    // création de l'objet contact et tableau produit pour l'envoyer au serveur
    let contact = {
      firstName: prenom,
      lastName: nom,
      address: addresse,
      city: ville,
      email: email,
    };
    let products = [];
    panierLocalStorage.forEach(function (product) {
      products.push(product.id);
    });

    let send = { contact: contact, products: products };
    send = JSON.stringify(send);
    
  
    fetch("Access-Control-Allow-Origin: http://localhost:3000/api/cameras/order", {
      method: "POST",
      body: send,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        // si connection réussi ajouter orderId au localStorage et redirection ver la page confirlation.html
        if (response.ok) {
          response.json().then(function (data) { 
            localStorage.setItem("orderId", data.orderId);
            window.location.href = "confirmation.html";
          });
        } else {
          Promise.reject(response.status);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});
