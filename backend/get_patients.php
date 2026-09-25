<?php

header("Content-Type: application/json");

require_once "db.php";


/*
|--------------------------------------------------------------------------
| Get patients
|--------------------------------------------------------------------------
*/

$sql = "
    SELECT
        id,
        full_name,
        age,
        gender,
        phone,
        diagnosis,
        created_at
    FROM patients
    ORDER BY id DESC
";


$result =
    $conn->query($sql);


if (!$result) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Unable to retrieve patient records."
    ]);

    exit;

}


/*
|--------------------------------------------------------------------------
| Build patient array
|--------------------------------------------------------------------------
*/

$patients = [];


while (
    $row =
    $result->fetch_assoc()
) {

    $patients[] = $row;

}


/*
|--------------------------------------------------------------------------
| Return JSON
|--------------------------------------------------------------------------
*/

echo json_encode([
    "success" => true,
    "patients" => $patients
]);


$conn->close();

?>