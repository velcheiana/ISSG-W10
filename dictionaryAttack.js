const crypto = require('crypto');
const https = require('https');
const readline = require('readline');

// Target MD5 hash of Bob's password
const targetHash = '578ed5a4eecf5a15803abdc49f6152d6';

// GitHub raw link to the password list
const passwordListURL = 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/500-worst-passwords.txt';

// Function to hash a password using MD5
function md5Hash(password) {
    return crypto.createHash('md5').update(password).digest('hex');
}

// Function to perform a dictionary attack
function dictionaryAttack(url, targetHash) {
    https.get(url, (response) => {
        const rl = readline.createInterface({ input: response });

        rl.on('line', (line) => {
            const hashedPassword = md5Hash(line.trim());
            if (hashedPassword === targetHash) {
                console.log(`Bob's password is: ${line.trim()}`);
                rl.close();
                process.exit(0); // Exit the program once the password is found
            }
        });

        rl.on('close', () => {
            console.log('Password not found in the dictionary.');
        });
    }).on('error', (err) => {
        console.error('Error fetching the password list:', err.message);
    });
}

// Start the dictionary attack
dictionaryAttack(passwordListURL, targetHash);
