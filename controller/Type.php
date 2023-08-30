<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../api/config.php';


$conn = connect();


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT * FROM typebirds";

    $result = mysqli_query($conn, $query);

    $typebirds = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $typebirds[] = $row;
    }

    echo json_encode($typebirds);
}
