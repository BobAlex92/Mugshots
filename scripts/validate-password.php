<?php
// validate-password.php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the user input and trim whitespace
    $userInput = trim($_POST['userInput']);
    
    
    // Reverse the user input and define the correct answer
    $reversedInput = strrev($userInput);
    $correctAnswer = "Espressos";

    // Check if the reversed input matches the correct answer (case-insensitive)
    if (strcasecmp($reversedInput, $correctAnswer) == 0) {
        echo json_encode(["status" => "success", "message" => "Congratulations! You've cracked the code and found the password."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Oops! That's not quite right. Try again."]);
    }
}
?>
