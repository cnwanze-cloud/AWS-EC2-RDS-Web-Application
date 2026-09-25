<?php

header("Content-Type: application/json");

require_once "db.php";


/*
|--------------------------------------------------------------------------
| Get submitted values
|--------------------------------------------------------------------------
*/

$id =
    intval($_POST["id"] ?? 0);

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
| Validate
|--------------------------------------------------------------------------
*/

if (
    $id <= 0 ||
    $full_name === "" ||
    $age <= 0 ||
    $gender === "" ||
    $diagnosis === ""
) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Invalid patient information."
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
| Update database
|--------------------------------------------------------------------------
*/

$sql = "
    UPDATE patients
    SET
        full_name = ?,
        age = ?,
        gender = ?,
        phone = ?,
        diagnosis = ?
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


/*
|--------------------------------------------------------------------------
| Bind parameters
|--------------------------------------------------------------------------
*/

$stmt->bind_param(
    "sisssi",
    $full_name,
    $age,
    $gender,
    $phone,
    $diagnosis,
    $id
);


/*
|--------------------------------------------------------------------------
| Execute
|--------------------------------------------------------------------------
*/

if ($stmt->execute()) {

    if ($stmt->affected_rows >= 0) {

        echo json_encode([
            "success" => true,
            "message" => "Patient updated successfully."
        ]);

    }

} else {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Unable to update patient."
    ]);

}


$stmt->close();

$conn->close();

?>