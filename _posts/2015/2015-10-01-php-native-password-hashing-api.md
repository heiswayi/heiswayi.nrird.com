---
layout: post
title: How to use PHP native password hashing API
description: Starting PHP version 5.5 onwards, password hashing in PHP apps becomes more convenient as the new native password hashing function has been introduced.
tags: [PHP, Password, Programming, Algorithm]
---

PHP is a popular programming language used for web development, and it includes a built-in native password hashing API. This API allows developers to easily hash passwords in a secure manner, ensuring that sensitive user information is protected.

When storing passwords in a database, it is important to never store them in plain text. This is because if a database were to be compromised, the attacker would have immediate access to all of the user's passwords. Instead, passwords should be hashed using a secure algorithm.

PHP's native password hashing API makes this process easy and secure. It uses the bcrypt algorithm, which is a widely-used and secure method for hashing passwords. Bcrypt is a "salted" hashing algorithm, which means that it uses a randomly generated string of characters (the "salt") to make the resulting hash even more secure.

To use PHP's password hashing API, developers simply need to call the `password_hash()` function and pass in the password they want to hash. This function returns the hashed password, which can then be safely stored in a database.

For example, to hash a password with PHP's native password hashing API, you could use the following code:

```php
<?php
$password = 'mypassword';
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
?>
```

Once the password has been hashed, it can be verified by calling the `password_verify()` function. This function takes the plain text password and the hashed password as arguments, and returns `true` if the passwords match and `false` if they don't.

```php
<?php
$password = 'mypassword';
$hashedPassword = '$2y$10$SOMEHASHEDPASSWORD';

if (password_verify($password, $hashedPassword)) {
    // Password is correct
} else {
    // Password is incorrect
}
?>
```

In addition to the `PASSWORD_DEFAULT` constant, PHP's password hashing API also offers the `PASSWORD_BCRYPT` constant. This constant can be used to explicitly specify that the bcrypt algorithm should be used for password hashing.

```php
<?php
$password = 'mypassword';
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);
?>
```

Overall, PHP's native password hashing API is a simple and secure way to hash passwords and protect sensitive user information. It is important for developers to use this API, or another secure method, to ensure that their user's passwords are properly protected.


### Cryptographic salt

Cryptographic salt is a random string of characters that is used as an additional input to a one-way hashing function. The purpose of a salt is to make it more difficult for attackers to crack a password by pre-computing hashes for a dictionary of common passwords. When a password is hashed, the salt is concatenated with the password before it is passed through the hashing function, resulting in a unique hash that cannot be easily cracked by attackers. Cryptographic salt is typically generated using a cryptographically secure random number generator and is stored alongside the hashed password in a database.

`password_hash()` will create a random salt if one is not provided, and this is generally the easiest and the most secure approach.

#### Storing the salt

When using `password_hash()`, the return value includes the salt as part of the generated hash. This value should be stored verbatim in your database, as it includes information about the hash function that was used and can then be given directly to `password_verify()` when verifying passwords.

{% include image.html src="assets/images/9cmcBRo.png" caption="A structure of the hashed password string" %}

The diagram above shows the format of a return value from `password_hash()`. As you can see, they are self-contained, with all the information on the algorithm and salt required for future password verification.