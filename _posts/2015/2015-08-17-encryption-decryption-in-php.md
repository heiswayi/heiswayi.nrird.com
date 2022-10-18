---
layout: post
title: Encryption & Decryption in PHP
description: Building a secure function to encrypt and decrypt sensitive data in PHP.
tags: [Programming, PHP, Encryption, Decryption]
---

{:.warning}
**UPDATE**<br>
`mcrypt` library was DEPRECATED in PHP 7.1.0, and REMOVED in PHP 7.2.0. Alternative to this library is to use [Sodium](https://www.php.net/manual/en/book.sodium.php) (available as of PHP 7.2.0) or [OpenSSL](https://www.php.net/manual/en/book.openssl.php).

The following code snippets are encryption and decryption function that I used the most when I need to encrypt and decrypt some sensitive data. These PHP functions are written based on [mcrypt_encrypt](https://www.php.net/manual/en/function.mcrypt-encrypt.php) and [mcrypt_decrypt](https://www.php.net/manual/en/function.mcrypt-decrypt.php) respectively.

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

The output will keep changing each time the function is being executed. This is due to `mt_rand()` function is used to generate the _salt_.

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