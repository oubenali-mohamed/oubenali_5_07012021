const produit = document.getElementById("produit");

fetch("https://monorinoco.herokuapp.com/api/cameras")
  .then((response) => {
    // vérification de la connection au serveur
    if (response.ok) { 
      return response.json();
    } else {
      return Promise.reject(response.status);
    }
  })
  // Si la connection à réussi afficher tous les produits
  .then((data) => { 
    data.forEach((objet) => {
      produit.innerHTML += ` 
        <a href="produit.html?id=${objet._id}">
            <h1>${objet.name}</h1> 
            <img src = "${objet.imageUrl}" alt = "${objet.name}" </br>
            <h3>${objet.price / 100} €</h3>
        </a>
        `;
    });
  });
