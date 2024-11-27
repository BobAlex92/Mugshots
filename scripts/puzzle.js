// puzzle.js

// Caesar Cipher decode function with simplified backward shift
function caesarCipherDecode(text, shift) {
    let decodedText = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char >= 'A' && char <= 'Z') {
            const base = 65;
            decodedText += String.fromCharCode((char.charCodeAt(0) - base - shift + 26) % 26 + base);
        } else if (char >= 'a' && char <= 'z') {
            const base = 97;
            decodedText += String.fromCharCode((char.charCodeAt(0) - base - shift + 26) % 26 + base);
        } else {
            decodedText += char;
        }
    }
    return decodedText;
}

// Lockout mechanism
const maxAttempts = 3;
const lockoutDuration = 60 * 60 * 1000; // 1 hour in milliseconds

// Retrieve attempts and lockout data from localStorage
let attempts = parseInt(localStorage.getItem('attempts')) || 0;
let lockoutTimestamp = parseInt(localStorage.getItem('lockoutTimestamp')) || 0;

// Check if lockout is active
const isLockedOut = () => {
    const now = Date.now();
    if (now < lockoutTimestamp) {
        document.getElementById('lockout-message').style.display = 'block';
        return true;
    }
    // Reset attempts if lockout has expired
    localStorage.setItem('attempts', 0);
    return false;
};

// Event listener for the decrypt button
document.getElementById('decrypt-button').addEventListener('click', function () {
    if (isLockedOut()) return;

    const encryptedText = "pda lkooa iaapo wp zwsj";
    const shiftValue = parseInt(document.getElementById('shift-input').value);

    if (isNaN(shiftValue)) {
        document.getElementById('decoded-message').textContent = "Please enter a valid number for the shift value.";
        document.getElementById('decoded-message').style.color = "red";
        return;
    }

    const decodedText = caesarCipherDecode(encryptedText, shiftValue);
    const correctMessage = "the posse meets at dawn";

    const decodedMessageElement = document.getElementById('decoded-message');
    decodedMessageElement.textContent = decodedText;

    if (decodedText.toLowerCase() === correctMessage.toLowerCase()) {
        decodedMessageElement.textContent += " - Congratulations! You've cracked the code.";
        decodedMessageElement.style.color = "green";
        document.getElementById('success-message').style.display = 'block';

        // Reset attempts after a successful decode
        localStorage.setItem('attempts', 0);
    } else {
        // Increment and store attempts
        attempts += 1;
        localStorage.setItem('attempts', attempts);

        decodedMessageElement.textContent += " - Try a different shift value.";
        decodedMessageElement.style.color = "red";

        // Check if maximum attempts are reached
        if (attempts >= maxAttempts) {
            const lockoutTime = Date.now() + lockoutDuration;
            localStorage.setItem('lockoutTimestamp', lockoutTime);
            document.getElementById('lockout-message').style.display = 'block';
            attempts = 0;
            localStorage.setItem('attempts', attempts); // reset attempt count after locking out
        }
    }
});
