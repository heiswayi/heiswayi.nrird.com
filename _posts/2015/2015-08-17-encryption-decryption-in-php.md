---
layout: post
title: Encryption & decryption in PHP
description: Building a secure function to encrypt and decrypt sensitive data in PHP.
tags: [Programming, PHP, Encryption, Decryption]
---

{:.warning}
**UPDATE:** `mcrypt` library was DEPRECATED in PHP 7.1.0, and REMOVED in PHP 7.2.0. Alternative to this library is to use [Sodium](https://www.php.net/manual/en/book.sodium.php) (available as of PHP 7.2.0) or [OpenSSL](https://www.php.net/manual/en/book.openssl.php).

These code snippets are the encryption and decryption function that I used the most when I need to encrypt/decrypt any sensitive data. These PHP functions are written based on  [mcrypt_encrypt](https://www.php.net/manual/en/function.mcrypt-encrypt.php) and [mcrypt_decrypt](https://www.php.net/manual/en/function.mcrypt-decrypt.php) respectively.

### Encryption

```php
<?php
function Encrypt($password, $data)
{
    $salt = substr(md5(mt_rand(), true), 8);
    $key = md5($password . $salt, true);
    $iv  = md5($key . $password . $salt, true);
    $ct = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $data, MCRYPT_MODE_CBC, $iv);
    return base64_encode('Salted__' . $salt . $ct);
}
?>
```

Example:

```php
<?php
echo Encrypt('myPass123', 'Welcome to Flippancy 25');
// Output: U2FsdGVkX19LYv5Y5EDmFbjH8bGMDFwlid30h2x1ybibT1Dwp0vekJ0OT4tb7/j6
?>
```

When you execute the function for multiple times with the same parameters, you will notice the encrypted string will keep changing. This is because we have `mt_rand()` function that is used to generate the _salt_.

Example:

```
// Output 1: U2FsdGVkX19LYv5Y5EDmFbjH8bGMDFwlid30h2x1ybibT1Dwp0vekJ0OT4tb7/j6
// Output 2: U2FsdGVkX1/3zxJCcE8p89t67nJNp8blNkezNxTVn4IDFQLM755K2+OSfFHewDLI
// Output 3: U2FsdGVkX18OQ8puUN8BBi+d6vAjEzDTZqM2WaKQD1atOykkYl9MY7NQM1DqI4Kw
```

### Decryption

```php
<?php
function Decrypt($password, $data)
{
    $data = base64_decode($data);
    $salt = substr($data, 8, 8);
    $ct   = substr($data, 16);
    $key = md5($password . $salt, true);
    $iv  = md5($key . $password . $salt, true);
    $pt = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $ct, MCRYPT_MODE_CBC, $iv);
    return $pt;
}
?>
```

Example:

```php
<?php
echo Decrypt('myPass123', 'U2FsdGVkX19LYv5Y5EDmFbjH8bGMDFwlid30h2x1ybibT1Dwp0vekJ0OT4tb7/j6');
echo Decrypt('myPass123', 'U2FsdGVkX1/3zxJCcE8p89t67nJNp8blNkezNxTVn4IDFQLM755K2+OSfFHewDLI');
echo Decrypt('myPass123', 'U2FsdGVkX18OQ8puUN8BBi+d6vAjEzDTZqM2WaKQD1atOykkYl9MY7NQM1DqI4Kw');
// All of the above operations output the same decrypted data: "Welcome to Flippancy 25"
?>
```

### FAQ

#### Can I use this encryption method to protect a password?

The answer is no.

To secure a user password, the best practice is to implement a **one-way hashing algorithm technique**. This implementation is irreversible. Unlike the encryptions, they are formulated to be decryptable. In PHP, it is recommended to use the built-in functions to securely hash the user password, e.g. [password_hash](http://php.net/manual/en/function.password-hash.php) or [crypt](http://php.net/manual/en/function.crypt.php).

In my previous PHP apps development, I used this custom function to **hash** the user password securely:

```php
<?php
function hashPassword($password, $salt) {
    return hash("SHA512", base64_encode(str_rot13(hash("SHA512", str_rot13($salt . $password)))));
}
?>
```

Example:

```php
<?php
echo hashPassword('myPa55w0rd', 'Flipp@ncy25');
// Output: 815890bb72e10a75a52087513a931afb6641a5d8d105365fa6f389f038dd81b45290a44cf94bb61e7741e073c6f4d59a16e9896bd197cc320f84f3a4d27cfb50
?>
```

To learn more about password hashing, it is recommended for you to read [this article](https://crackstation.net/hashing-security.htm).