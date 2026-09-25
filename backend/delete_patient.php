<?php

header("Content-Type: application/json");

require_once "db.php";


/*
|--------------------------------------------------------------------------
| Get patient ID
|--------------------------------------------------------------------------
*/

$id =
    intval($_POST["id"] ?? 0);


if ($id <= 0) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Invalid patient ID."
    ]);

    exit;

}


/*
|--------------------------------------------------------------------------
| Delete patient
|--------------------------------------------------------------------------
*/

$sql = "
    DELETE FROM patients
    WHERE id = ?
";


$stmt =
    $conn->prepare($sql);


if (!$stmt) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare database query."
    ]);

    exit;

}


$stmt->bind_param(
    "i",
    $id
);


/*
|--------------------------------------------------------------------------
| Execute
|--------------------------------------------------------------------------
*/

if ($stmt->execute()) {

    if ($stmt->affected_rows > 0) {

        echo json_encode([
            "success" => true,
            "message" => "Patient deleted successfully."
        ]);

    } else {

        http_response_code(404);

        echo json_encode([
            "success" => false,
            "message" => "Patient record not found."
        ]);

    }

} else {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Unable to delete patient."
    ]);

}


$stmt->close();

$conn->close();

?>