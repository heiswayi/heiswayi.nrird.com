---
layout: post
title: Encryption and decryption in PHP
description: A simple tutorial to encrypt and decrypt data using PHP
tags: [Programming, PHP, Encryption, Decryption]
---

{:.warning}
**UPDATE**<br>
`mcrypt` library was DEPRECATED in PHP 7.1.0, and REMOVED in PHP 7.2.0. Alternative to this library is to use [Sodium](https://www.php.net/manual/en/book.sodium.php) (available as of PHP 7.2.0) or [OpenSSL](https://www.php.net/manual/en/book.openssl.php).

Encryption and decryption are essential components of modern data security. They allow us to protect sensitive information from unauthorized access and ensure that only authorized users can read and make use of it. In this blog post, we will take a closer look at encryption and decryption in PHP, a popular programming language used for web development.

Encryption is the process of converting plaintext, or unencrypted data, into ciphertext, or encrypted data. This is done using an algorithm, known as a cipher, which applies a mathematical transformation to the data. The resulting ciphertext is scrambled and unreadable to anyone who does not have the proper decryption key.

Decryption is the reverse process of encryption. It involves applying the same mathematical transformation to the ciphertext, using the appropriate decryption key, in order to convert it back into plaintext. This allows authorized users to access and read the original unencrypted data.

PHP provides several built-in functions for performing encryption and decryption. The most commonly used ones are `mcrypt_encrypt()` and `mcrypt_decrypt()`, which use the libmcrypt library for encryption and decryption.

Here is an example of how to use these functions to encrypt and decrypt data in PHP:

```php
<?php

// Encrypt a message
$message = 'This is a secret message';
$key = 'my secret key';
$encrypted_message = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $message, MCRYPT_MODE_CBC);

// Decrypt an encrypted message
$decrypted_message = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $encrypted_message, MCRYPT_MODE_CBC);

// Output the decrypted message
echo $decrypted_message;

?>
```

In the example above, we use the Rijndael cipher with a 128-bit key to encrypt and decrypt the message. The ciphertext is encrypted using the Cipher Block Chaining (CBC) mode, which is a popular mode of operation for block ciphers.

It is important to note that the encryption and decryption keys used in the example above are simply examples and should not be used in real-world applications. In practice, the keys should be generated using a secure random number generator and should be long and complex enough to prevent brute-force attacks.

Encryption and decryption are crucial for ensuring the security of sensitive data. By using the built-in functions provided by PHP, we can easily implement encryption and decryption in our web applications and protect our data from unauthorized access.