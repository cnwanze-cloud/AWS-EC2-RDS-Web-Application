<?php

header("Content-Type: application/json");

require_once "db.php";


/*
|--------------------------------------------------------------------------
| Get submitted values
|--------------------------------------------------------------------------
*/

$full_name =
    trim($_POST["full_name"] ?? "");

$age =
    intval($_POST["age"] ?? 0);

$gender =
    trim($_POST["gender"] ?? "");

$phone =
    trim($_POST["phone"] ?? "");

$diagnosis =
    trim($_POST["diagnosis"] ?? "");


/*
|--------------------------------------------------------------------------
| Validate input
|--------------------------------------------------------------------------
*/

if (
    $full_name === "" ||
    $age <= 0 ||
    $gender === "" ||
    $diagnosis === ""
) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Please complete all required fields."
    ]);

    exit;

}


if ($age > 120) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid age."
    ]);

    exit;

}


/*
|--------------------------------------------------------------------------
| Insert patient
|--------------------------------------------------------------------------
*/

$sql = "
    INSERT INTO patients
    (
        full_name,
        age,
        gender,
        phone,
        diagnosis
    )
    VALUES (?, ?, ?, ?, ?)
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


/*
|--------------------------------------------------------------------------
| Bind parameters
|--------------------------------------------------------------------------
*/

$stmt->bind_param(
    "sisss",
    $full_name,
    $age,
    $gender,
    $phone,
    $diagnosis
);


/*
|--------------------------------------------------------------------------
| Execute
|--------------------------------------------------------------------------
*/

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Patient added successfully.",
        "id" => $stmt->insert_id
    ]);

} else {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Unable to add patient."
    ]);

}


$stmt->close();

$conn->close();

?>