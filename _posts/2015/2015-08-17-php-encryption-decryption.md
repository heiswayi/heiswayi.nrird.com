---
layout: post
title: PHP - Encryption and decryption function
description: Building a strong PHP function to encrypt/secure senstive data that may help to speed up the development of your PHP applications.
keywords: php encryption function, php decryption function, secure password hashing using php
tags: [PHP, Encryption, Decryption, Password Hashing, Programming]
comments: true
---

If you're creating a PHP application from scratch, or working with confidential/sensitive data, you need data encryption. This is to ensure when you transport or save those data, it would be kept safely. Data encryption is like a security box where you put something important in there and then deliver/save it to somewhere where only you or person that has the key can open that box. **Data encryption is NOT for password because it's reversible.** But what you can do with data encryption is the harden the process, increase the security level, hide the sensitive content or confidential information. These PHP function can fit in your utilities.

### Data encryption function

This function is to encrypt any data string. You need to provide a password because you gonna need it when you want to decrypt back the encrypted string.

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

**Example:**

```php
<?php
echo Encrypt('myPass123', 'Welcome to Flippancy 25');
// Output: U2FsdGVkX19LYv5Y5EDmFbjH8bGMDFwlid30h2x1ybibT1Dwp0vekJ0OT4tb7/j6
?>
```

Please note that, every time the function `Encrypt()` is executed, with the **same password** and **same data string**, the encrypted string (output) is **always get changed** as the `mt_rand()` function is used for generating the _salt_.

Here are the example outputs of the encrypted string (same data) after I executed it for 3 times:-

```
// Output 1: U2FsdGVkX19LYv5Y5EDmFbjH8bGMDFwlid30h2x1ybibT1Dwp0vekJ0OT4tb7/j6
// Output 2: U2FsdGVkX1/3zxJCcE8p89t67nJNp8blNkezNxTVn4IDFQLM755K2+OSfFHewDLI
// Output 3: U2FsdGVkX18OQ8puUN8BBi+d6vAjEzDTZqM2WaKQD1atOykkYl9MY7NQM1DqI4Kw
```

Hence, even the encrypted string is changed each time I executed the encrypt function for the same input data, but it still can be decrypted to get back the original data string.

### Data decryption function

This function is to decrypt the encrypted string. You need to provide the right password that is used for the encryption, or else you will never get back the original data.

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

**Example:**

```php
<?php
echo Decrypt('myPass123', 'U2FsdGVkX19LYv5Y5EDmFbjH8bGMDFwlid30h2x1ybibT1Dwp0vekJ0OT4tb7/j6');
echo Decrypt('myPass123', 'U2FsdGVkX1/3zxJCcE8p89t67nJNp8blNkezNxTVn4IDFQLM755K2+OSfFHewDLI');
echo Decrypt('myPass123', 'U2FsdGVkX18OQ8puUN8BBi+d6vAjEzDTZqM2WaKQD1atOykkYl9MY7NQM1DqI4Kw');
// All of three above will output the same decrypted data: Welcome to Flippancy 25
?>
```

Please note that, for each encryption and decryption, they requires the **same password** to work in the expected result.

### Data encryption is NOT for password!

Data encryption would be useful for something like social security number, phone number, bank account number, credit card information, and so on. But it's practically insecure for a USER PASSWORD! This is because the algorithm is designed to be reversible (ability to be decrypted).

### Hashing algorithm for securing user password

To secure the user password, the best practice is to implement a **one-way hashing algorithm technique**, which means it cannot be decrypted (irreversible). Unlike the encryptions, they are formulated to be able to be decrypted. In PHP, it's recommended to use the built-in functions to securely hash the user password such as [password_hash](http://php.net/manual/en/function.password-hash.php) or [crypt](http://php.net/manual/en/function.crypt.php).

But you want to implement a custom function, you can use this snippet:

```php
<?php
function hashPassword($password, $salt) {
    $hash_password = hash("SHA512", base64_encode(str_rot13(hash("SHA512", str_rot13($salt . $password)))));
    return $hash_password;
}
?>
```

**Example:**

```php
<?php
echo hashPassword('myPa55w0rd', 'Flipp@ncy25');
// Output: 815890bb72e10a75a52087513a931afb6641a5d8d105365fa6f389f038dd81b45290a44cf94bb61e7741e073c6f4d59a16e9896bd197cc320f84f3a4d27cfb50
?>
```

Another thing you can do to add extra layer of security is to enforce the strong password for the user or you can provide two-factor authentication service. If you are keen to learn more about password hashing, I recommend you to read [this article](https://crackstation.net/hashing-security.htm). It's a very good article talking about **salted password hashing**.