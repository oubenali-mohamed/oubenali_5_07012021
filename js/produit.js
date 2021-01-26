const leproduit = document.getElementById('leproduit');
let url = window.location.search;
let searchParams = new URLSearchParams(url);

let id = searchParams.get("id"); 
fetch("http://localhost:3000/api/cameras/" + id)
.then(response => {
    if(response.ok) {
        return response.json()
    } else {
        return Promise.reject(response.status);
    }
})
.then(data => {
    let options = "";
    for(let i = 0; i < data.lenses.length; i++) {
        options = options + `  <option value = " ${data.lenses[i]} ">${data.lenses[i]}</option>`;
   }
    leproduit.innerHTML += `
        <h1>${data.name}</h1> 
        <img src = "${data.imageUrl}" alt = "${data.name}" </br>
        <p>${data.description}</p>
        <h3>${data.price} €</h3>
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
    let prixUnitaire = document.getElementById('prix').value;
    let nombreArticle = document.getElementById('quantity').value;
    let prixTotal = (prixUnitaire * nombreArticle);
        let panier = document.getElementById('ajoutPanier');
            panier.addEventListener('click', function() {
                localStorage.setItem('id', document.getElementById('id_produit').value);
                localStorage.setItem('nom', document.getElementById('nomProduit').value);
                localStorage.setItem('prix', document.getElementById('prix').value);
                localStorage.setItem('image', document.getElementById('image').value);
                localStorage.setItem('quantite', document.getElementById('quantity').value);
                localStorage.setItem('prix totale', prixTotal);
            alert('votre produit à été ajouté au panier');  
        }); 
    })
    
    /* const theProduct = [];
    let theproductDetail = {
        id: document.getElementById('id_produit').value,
        nom : document.getElementById('nomProduit').value,
        prix : document.getElementById('prix').value,
        image : document.getElementById('image').value,
        quantite : document.getElementById('quantity').value,
};
theProduct.push(theproductDetail); console.log(theProduct)
localStorage.setItem('panier', theProduct);
alert('votre produit à été ajouté au panier'); */
            
 


    