<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../api/config.php';

$conn = connect();

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->id) && isset($data->type_of_birds)) {
        $id = $data->id;
        $type_of_birds = $data->type_of_birds;

        $query = "UPDATE `typebirds` SET `type_of_birds`='$type_of_birds' WHERE id='$id'";

        if (mysqli_query($conn, $query)) {
            echo json_encode(array("message" => "Type of bird edited successfully."));
        } else {
            echo json_encode(array("message" => "Error editing type of bird: " . mysqli_error($conn)));
        }
    }
}
