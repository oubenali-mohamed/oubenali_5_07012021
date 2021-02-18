
// affichage du localStorage
document.getElementById(
  "principal"
).innerHTML += `<h2> d'un montant de: ${localStorage.getItem("prixCommande")} € <br/> <br/> enregistré sous le numéro : ${localStorage.getItem(
  "orderId"
)}`
// suppression du localStorage
localStorage.clear();
