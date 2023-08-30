<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../api/config.php';


$conn = connect();


if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $query = "SELECT infobirds.*, typebirds.type_of_birds, categorybirds.category_birds
                  FROM infobirds
                  LEFT JOIN typebirds ON infobirds.type_of_bird = typebirds.id
                  LEFT JOIN categorybirds ON infobirds.categories_bird = categorybirds.id";

    $result = mysqli_query($conn, $query);

    $birds = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $birds[] = $row;
    }

    echo json_encode($birds);
}
