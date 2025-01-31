// script.js
const addProductButton = document.getElementById('addProductButton');
const productFormContainer = document.getElementById('productFormContainer');
const productForm = document.getElementById('productForm');
const noProductsMessage = document.getElementById('noProductsMessage');

// Charger les produits depuis l'API
async function loadProducts() {
    try {
        const response = await fetch('produits.php'); // Chemin mis à jour
        const data = await response.json();
        
        if (data.length > 0) {
            noProductsMessage.style.display = 'none';
            displayProducts(data);
        } else {
            noProductsMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        return [];
    }
}

// Afficher les produits dans la page
function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <h3>${product.nom}</h3>
            <p>Prix: ${product.prix}€</p>
            <p>${product.description}</p>
            ${product.image_url ? `<img src="${product.image_url}" alt="${product.nom}">` : ''}
        `;
        productList.appendChild(productElement);
    });
}

// Afficher le formulaire d'ajout
addProductButton.addEventListener('click', () => {
    productFormContainer.classList.remove('hidden');
});

// Ajouter un produit
productForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const productData = {
        nom: formData.get('nom'),
        prix: parseFloat(formData.get('prix')),
        description: formData.get('description'),
        image_url: formData.get('image_url')
    };

    try {
        const response = await fetch('produits.php', { // Chemin mis à jour
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        const result = await response.json();
        
        if (result.message) {
            // Produit ajouté avec succès
            productForm.reset();
            productFormContainer.classList.add('hidden');
            loadProducts(); // Recharger la liste des produits
        } else {
            alert('Erreur lors de l\'ajout du produit');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'ajout du produit');
    }
});

// Charger les produits au démarrage
document.addEventListener('DOMContentLoaded', loadProducts);
