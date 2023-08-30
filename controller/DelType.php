<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../api/config.php';

$conn = connect();

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->id)) {
        $id = $data->id;

        $query = "DELETE FROM `typebirds` WHERE id='$id'";

        if (mysqli_query($conn, $query)) {
            echo json_encode(array("message" => "Type of bird deleted successfully."));
        } else {
            echo json_encode(array("message" => "Error deleting type of bird: " . mysqli_error($conn)));
        }
    }
}
