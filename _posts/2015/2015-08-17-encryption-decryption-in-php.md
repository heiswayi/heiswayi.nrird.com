---
layout: post
title: Encryption & decryption in PHP
description: Building a secure function to encrypt and decrypt sensitive data in PHP.
tags: [programming, php, encryption, decryption]
---

**Update:** The `mcrypt` library used in the following code snippets is no longer recommended for secure encryption. It was deprecated in PHP 7.1.0 and removed entirely in PHP 7.2.0. For secure encryption in current PHP versions, consider using the following alternatives: [Sodium extension (available since PHP 7.2.0)](https://www.php.net/manual/en/book.sodium.php) / [OpenSSL functions](https://www.php.net/manual/en/book.openssl.php)

## Encryption Function

```php
<?php
function Encrypt($password, $data)
{
  // Generate random salt
  $salt = substr(md5(mt_rand(), true), 8);

  // Derive key from password and salt
  $key = md5($password . $salt, true);

  // Generate initialization vector (IV)
  $iv  = md5($key . $password . $salt, true);

  // Encrypt data using Rijndael-128 with CBC mode and the generated key and IV
  $ct = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $data, MCRYPT_MODE_CBC, $iv);

  // Prepend salt to the encrypted data and encode with base64
  return base64_encode('Salted__' . $salt . $ct);
}
?>
```

**Example Usage:**

```php
<?php
echo Encrypt('myPass123', 'Welcome to Flippancy 25');
// Output: (This will vary due to random salt generation)
?>
```

**Explanation:**

* The `mt_rand()` function generates a random salt for each encryption.
* The salt and password are combined to create a key and initialization vector (IV).
* The data is encrypted using the Rijndael-128 algorithm in CBC mode.
* The encrypted data is prepended with the salt and encoded with base64 for storage.

## Decryption Function

```php
<?php
function Decrypt($password, $data)
{
  // Decode base64 encoded data
  $data = base64_decode($data);

  // Extract salt from the beginning of the data
  $salt = substr($data, 8, 8);

  // Extract encrypted data
  $ct   = substr($data, 16);

  // Derive key from password and salt
  $key = md5($password . $salt, true);

  // Generate initialization vector (IV)
  $iv  = md5($key . $password . $salt, true);

  // Decrypt data using Rijndael-128 with CBC mode and the generated key and IV
  $pt = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $ct, MCRYPT_MODE_CBC, $iv);

  // Return decrypted data
  return $pt;
}
?>
```

**Example Usage:**

```php
<?php
$encrypted1 = 'U2FsdGVkX19LYv5Y5EDmFbjH8bGMDFwlid30h2x1ybibT1Dwp0vekJ0OT4tb7/j6';
$encrypted2 = 'U2FsdGVkX1/3zxJCcE8p89t67nJNp8blNkezNxTVn4IDFQLM755K2+OSfFHewDLI';
$encrypted3 = 'U2FsdGVkX18OQ8puUN8BBi+d6vAjEzDTZqM2WaKQD1atOykkYl9MY7NQM1DqI4Kw';

echo Decrypt('myPass123', $encrypted1);
echo Decrypt('myPass123', $encrypted2);
echo Decrypt('myPass123', $encrypted3);

// All of the above will output: "Welcome to Flippancy 25"
?>
```