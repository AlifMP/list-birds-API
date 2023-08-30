<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../api/config.php';

$conn = connect();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->type_of_birds)) {
        $type_of_birds = $data->type_of_birds;

        $query = "INSERT INTO typebirds (type_of_birds) VALUES ('$type_of_birds')";

        if (mysqli_query($conn, $query)) {
            echo json_encode(array("message" => "Type of bird added successfully."));
        } else {
            echo json_encode(array("message" => "Error adding type of bird: " . mysqli_error($conn)));
        }
    }
}
