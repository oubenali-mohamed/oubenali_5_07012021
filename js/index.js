const produit = document.getElementById('produit');

fetch("http://localhost:3000/api/cameras")
.then(response => {
    if(response.ok) {
        return response.json()
    } else {
        return Promise.reject(response.status);
    }
})
.then(data => {
    data.forEach((objet) => {
        produit.innerHTML += ` 
        <a href="produit.html?id=${objet._id}">
            <h1>${objet.name}</h1> 
            <img src = "${objet.imageUrl}" alt = "${objet.name}" </br>
            <h3>${objet.price/100} €</h3>
        </a>
        ` 
        }) 
    });
  

       
        
    