<?php

header('Content-Type: application/json');
session_start();
include 'db.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    print_r($data);

    if ($data !== null) {
        $level = $data['level'];
        

        $sql = "INSERT INTO stats (stage)
           VALUES ($level) WHERE name = 'swaggyM'";
           
           if ($conn->query($sql) === TRUE) {
             echo "New record created successfully";
           } else {
             echo "Error: " . $sql . "<br>" . $conn->error;
           }

        echo "Received data: Level = $level";
    } else {
        http_response_code(400);
        echo "Invalid data received.";
    }
} else {
    http_response_code(405);
    echo "Only POST requests are allowed.";
}
?>