const crypto = require('crypto');

// Given MD5 hash of Alice's PIN
const targetHash = '5531a5834816222280f20d1ef9e95f69';

// Function to hash a PIN using MD5
function md5Hash(pin) {
    return crypto.createHash('md5').update(pin).digest('hex');
}

// Brute-force attack to find the PIN
function bruteForcePIN() {
    for (let i = 0; i <= 9999; i++) {
        // Format the PIN to always have 4 digits (e.g., 0001, 0234)
        const pin = i.toString().padStart(4, '0');
        const hashedPin = md5Hash(pin);

        // Check if the hash matches the target hash
        if (hashedPin === targetHash) {
            return pin; // PIN found
        }
    }
    return null; // PIN not found
}

// Run the brute-force attack and print the result
const pin = bruteForcePIN();
if (pin) {
    console.log(`Alice's PIN is: ${pin}`);
} else {
    console.log("Failed to find the PIN.");
}
