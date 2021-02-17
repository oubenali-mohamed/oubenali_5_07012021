const leproduit = document.getElementById("leproduit");
let url = window.location.search;
let searchParams = new URLSearchParams(url);

let id = searchParams.get("id");
fetch("https://monorinoco.herokuapp.com/api/cameras/" + id)
  .then((response) => {
    // vérification de la connection au serveur
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.status);
    }
  })
  .then((data) => {
    // affichage des différentes options des lentilles
    let options = "";
    for (let i = 0; i < data.lenses.length; i++) {
      options =
        options +
        `  <option value = " ${data.lenses[i]} ">${data.lenses[i]}</option>`;
    }
    // affichage du produit dans le HTML
    leproduit.innerHTML += `
        <h1>${data.name}</h1> 
        <img src = "${data.imageUrl}" alt = "${data.name}" </br>
        <p>${data.description}</p>
        <h3>${data.price / 100} €</h3>
        <form> 
        <label for="exemplaires">exemplaires:</label>
        <input id="quantity" type="number" value="1"/>
        <input type = "hidden" id = "id_produit" value = "${id}" />
        <input type = "hidden" id = "nomProduit" value = "${data.name}" />
        <input type = "hidden" id = "prix" value = "${data.price}" />
        <input type = "hidden" id = "image" value = "${data.imageUrl}" />
        <label for="objectif">Objectif</label>
        <select id="objectif">
            ${options}
        </select> </br>       
       <button id = "ajoutPanier" type = "button" >Ajouter au panier</button>
      </form>   
    `;
    let prixUnitaire = document.getElementById("prix").value;
    // récupération des valeurs du produit au click du bouton ajouter au panier
    let panier = document.getElementById("ajoutPanier");
    panier.addEventListener("click", function rajout() {
      let nombreArticle = document.getElementById("quantity").value;
      let prixTotal = prixUnitaire * nombreArticle;
      let _produit = { 
        id: document.getElementById("id_produit").value,
        nom: document.getElementById("nomProduit").value,
        prix: document.getElementById("prix").value,
        quantite: document.getElementById("quantity").value,
        lentille: document.getElementById("objectif").value,
        prixTotal: prixTotal,
      };
      // vérification si le panier est vide et enregistrement du panier dans le localStorage
      let panierLocalStorage = localStorage.getItem("panier");
      if (panierLocalStorage == null) {
        panierLocalStorage = [];
      } else {
        panierLocalStorage = JSON.parse(panierLocalStorage);
      }
      panierLocalStorage.push(_produit);
      localStorage.setItem("panier", JSON.stringify(panierLocalStorage));
      alert("votre produit à été ajouté au panier");
    });
  });
