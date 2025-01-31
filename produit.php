<?php
// produits.php
header('Content-Type: application/json');
require_once 'config.php';  // Chemin modifié

function handleImageUpload($image) {
    $target_dir = "uploads/";  // Chemin modifié
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    $file_extension = strtolower(pathinfo($image["name"], PATHINFO_EXTENSION));
    $new_filename = uniqid() . '.' . $file_extension;
    $target_file = $target_dir . $new_filename;
    
    if (move_uploaded_file($image["tmp_name"], $target_file)) {
        return '/uploads/' . $new_filename;
    }
    return false;
}

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            $conn = getDBConnection();
            $stmt = $conn->query("SELECT * FROM products ORDER BY created_at DESC");
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'products' => $products]);
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;
    
    case 'POST':
        try {
            $conn = getDBConnection();
            
            // Vérifier si la requête est en JSON
            $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
            
            if ($contentType === "application/json") {
                // Pour les données JSON
                $content = file_get_contents("php://input");
                $decoded = json_decode($content, true);
                
                $name = $decoded['nom'];
                $price = $decoded['prix'];
                $quantity = isset($decoded['quantity']) ? $decoded['quantity'] : 0;
                $description = $decoded['description'];
                $image_url = isset($decoded['image_url']) ? $decoded['image_url'] : '';
                
            } else {
                // Pour les données form-data
                $name = $_POST['name'];
                $price = $_POST['price'];
                $quantity = $_POST['quantity'];
                $description = $_POST['description'];
                
                $image_url = '';
                if (isset($_FILES['image'])) {
                    $image_url = handleImageUpload($_FILES['image']);
                    if (!$image_url) {
                        throw new Exception("Erreur lors du téléchargement de l'image");
                    }
                }
            }
            
            $stmt = $conn->prepare("INSERT INTO products (name, price, quantity, description, image_url) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$name, $price, $quantity, $description, $image_url]);
            
            echo json_encode(['success' => true, 'message' => 'Produit ajouté avec succès']);
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;
}