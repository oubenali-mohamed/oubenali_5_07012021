// affichage du localStorage
document.getElementById(
  "principal"
).innerHTML += `<h2> enregistré sous le numéro : ${localStorage.getItem(
  "orderId"
)}`;
// suppression du localStorage
localStorage.clear();
