<?php

/*
|--------------------------------------------------------------------------
| CloudCare Database Connection
|--------------------------------------------------------------------------
| This file does NOT create the database or tables.
| The database and tables are created manually in Amazon RDS.
|--------------------------------------------------------------------------
*/


$host = "<YOUR RDS ENDPOINT>";

$username = "<ADMIN USERNAME>";

$password = "<DATABASE PASSWORD>";

$database = "<DATABASE NAME>";


// Create MySQL connection

$conn = new mysqli(
    $host,
    $username,
    $password,
    $database
);


// Check connection

if ($conn->connect_error) {

    http_response_code(500);

    die(
        "Database connection failed: " .
        $conn->connect_error
    );

}


// Use UTF-8

$conn->set_charset("utf8mb4");

?>