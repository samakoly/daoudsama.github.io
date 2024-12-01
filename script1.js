const addProductButton = document.getElementById('addProductButton');
const productFormContainer = document.getElementById('productFormContainer');
const productForm = document.getElementById('productForm');
const noProductsMessage = document.getElementById('noProductsMessage');

// Charger les produits depuis le localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Vérifier si des produits existent déjà au chargement
function checkProducts() {
  if (products.length > 0) {
    noProductsMessage.style.display = 'none';
  } else {
    noProductsMessage.style.display = 'block';
  }
}

// Afficher le formulaire d'ajout
addProductButton.addEventListener('click', () => {
  productFormContainer.classList.remove('hidden');
});

// Ajouter un produit
productForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;
  const quantity = document.getElementById('productQuantity').value;
  const imageFile = document.getElementById('productImage').files[0];

  if (name && price && quantity && imageFile) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageUrl = event.target.result; // Convertir en Base64
      products.push({ name, price, quantity, imageUrl });
      localStorage.setItem('products', JSON.stringify(products));

      alert(`Produit "${name}" ajouté avec succès !`);
      productForm.reset();
      productFormContainer.classList.add('hidden');
      checkProducts();
    };
    reader.readAsDataURL(imageFile); // Convertir l'image en Base64
  }
});

// Chargement initial
document.addEventListener('DOMContentLoaded', () => {
  checkProducts();
});
