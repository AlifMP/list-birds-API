<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../api/config.php';

$conn = connect();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = $_POST;

    if (isset($data['name_of_bird']) && isset($data['type_of_bird']) && isset($data['categories_bird']) && isset($_FILES['pict_bird'])) {
        $name_of_bird = $data['name_of_bird'];
        $type_of_bird = $data['type_of_bird'];
        $categories_bird = $data['categories_bird'];

        $file_name = $_FILES['pict_bird']['name'];
        $file_tmp = $_FILES['pict_bird']['tmp_name'];
        $file_path = "../uploads/" . $file_name;

        if (move_uploaded_file($file_tmp, $file_path)) {
            $query = "INSERT INTO infobirds (name_of_bird, type_of_bird, categories_bird, pict_bird) VALUES ('$name_of_bird', '$type_of_bird', '$categories_bird', '$file_path')";

            if (mysqli_query($conn, $query)) {
                echo json_encode(array("message" => "Bird information successfully added."));
            } else {
                echo json_encode(array("message" => "Error adding bird information: " . mysqli_error($conn)));
            }
        } else {
            echo json_encode(array("message" => "Error uploading file."));
        }
    }
}
