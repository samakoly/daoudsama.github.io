// Fournisseur unique
const fournisseur = {
  email: "daoudsama70@gmail.com",
  password: "1970_24_10"
};

// Boutons de sélection de rôle
const btnFournisseur = document.getElementById('btnFournisseur');
const btnAcheteur = document.getElementById('btnAcheteur');

// Conteneur du formulaire de connexion
const formContainer = document.getElementById('formContainer');
const form = document.getElementById('loginForm');
const message = document.getElementById('message');

// Gestion du clic sur le bouton "Fournisseur"
btnFournisseur.addEventListener('click', () => {
  formContainer.classList.remove('hidden'); // Afficher le formulaire
});

// Gestion du clic sur le bouton "Acheteur"
btnAcheteur.addEventListener('click', () => {
  // Redirection vers une autre page pour les acheteurs
  window.location.href = "produit.html"; // Vous pouvez créer un fichier produit.html pour cette page
});

// Gestion de la soumission du formulaire
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Vérification des informations
  if (email === fournisseur.email && password === fournisseur.password) {
    message.style.color = 'green';
    message.textContent = "Bienvenue, fournisseur ! Vous êtes responsable de ce site.";
    // Redirection vers la page fournisseur après 2 secondes
    setTimeout(() => {
      window.location.href = "fournisseur.html"; // Vous pouvez créer un fichier fournisseur.html pour la page du fournisseur
    }, 2000);
  } else {
    message.style.color = 'red';
    message.textContent = "Accès refusé : email ou mot de passe incorrect.";
  }
});

// Ajouter des lignes animées dynamiquement au fond
document.addEventListener('DOMContentLoaded', () => {
  const linesContainer = document.querySelector('.lines');

  // Créez 20 lignes animées
  for (let i = 0; i < 20; i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.left = `${Math.random() * 100}%`; // Position aléatoire
    line.style.animationDuration = `${2 + Math.random() * 3}s`; // Durée aléatoire
    linesContainer.appendChild(line);
  }
});
