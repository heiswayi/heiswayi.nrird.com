---
layout: post
title: SSO with Keycloak
description: Keycloak is an open source Single Sign-On (SSO) solution for web apps and RESTful web services.
tags: [Keycloak, User Authentication, Open Source]
---

### Brief Introduction about Keycloak

Keycloak is an open source solution for user identity and access management that you can self-host. It makes securing your applications and services easier with minimal effort. You don't need to deal with storing or authenticating users as everything is available out of the box. Keycloak offers the following features:

- Single sign-on and single logout
- Support for standard protocols such as OpenID Connect (OIDC), OAuth 2.0, and SAML 2.0
- Flexible authentication and authorization
- Multi-factor authentication (MFA) such as one-time passwords (OTP)
- Social logins such as Google, Facebook, and Twitter
- Centralized user management
- Support for directory services such as LDAP and Active Directory
- Customization and extensibility
- Easy setup and integration using provided client adapters.



### Keycloak Core Concepts and Architecture

A Keycloak _realm_ is like a namespace that allows you to manage all of your metadata and configurations. You can create as many realms as you like. The default realm is called `master` which is dedicated to manage Keycloak and should not be used for your own applications. Basically you need to create a new realm to get started. Following are the entities that being managed by a single realm:-

- Clients
- Roles
- Identity Providers (OIDC 1.0, Keycloak OIDC, SAML 2.0, Social Logins)
- User Federation (Kerberos, LDAP)
- Authentication configurations
- User Management (Groups, Users)
- UI Themes
- Realm settings

Following image illustrates the architecture of Keycloak software;

{% include image.html src="assets/images/c7irtZ4.png" caption="Credit: Courtesy of Thomas Darimont" %}



### User Authentication using Keycloak

#### Keycloak as Identity Provider to Frontend Application

Following image illustrates how a user is authenticated when accessing the frontend application;

{% include image.html src="assets/images/g5eZLph.png" caption="Credit: Courtesy of Thomas Darimont" %}

#### SSO Integration

Web SSO is the most useful feature where you login once to access all applications. Keycloak also supports single logout that can be propagated to all clients. This works for web, mobile and desktop applications.

Following image illustrates the authentication flow of a logged-in user accessing another frontend application;

{% include image.html src="assets/images/0ug7eMI.png" caption="Credit: Courtesy of Thomas Darimont" %}

#### How backend services work with Keycloak

Following image illustrates the flow on how the backend services work with Keycloak to validate the access token;

{% include image.html src="assets/images/Fi77aj0.png" caption="Credit: Courtesy of Thomas Darimont" %}



### Understanding Keycloak Tokens

Keycloak works based on tokens. Following are the few things that describe a token in Keycloak, especially for OAuth2 and OIDC protocol:

- The token is a signed self-contained JSON Web Token (JWT).
- The token contains claims that hold metadata and user information.
- The token is issued by Keycloak that is signed with a realm private key.
- The token is verified using the realm public key.
- The token has limited lifespan which is revokable.

Following are the available types of token when authenticating with Keycloak:

| Access token | Usually it has short-lived lifespan (minutes) and it is used for accessing resources. |
| Refresh token | Usually it has long-lived lifespan (days) and it is used for requesting new tokens. |
| Offline token | A special refresh token that "never" expires. |
| ID token | Contains information about user (used by OIDC). |



### Example Screenshots of Keycloak UI

#### Keycloak Admin Console

{% include image.html src="assets/images/nIYaSsl.png" caption="Keycloak Admin Console (v11)" %}

#### Keycloak User Account Console

{% include image.html src="assets/images/QN5i0dn.png" caption="Keycloak User Account Console (v11)" %}



### Keycloak Admin REST API Examples

These are the most common REST APIs that I used for applications. To learn more about what else that's available, please check out [Keycloak Admin REST API documentation page](https://www.keycloak.org/docs-api/5.0/rest-api/index.html).

#### Authenticate as Keycloak Admin

```bash
curl --location --request POST '<KEYCLOAK_SERVER>/auth/realms/master/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'username=<KEYCLOAK_ADMIN_USER>' \
--data-urlencode 'password=<KEYCLOAK_ADMIN_PASS>' \
--data-urlencode 'client_id=admin-cli'
```

#### Get user list executed from a specific user account

Following are the prerequisite steps that needed to be applied on Keycloak Admin Console:

1. From a selected realm, go to Manage ⟶ Users.
2. To apply for a specific user, click on "View all users" button then click on selected user ID.
3. Go to Role Mappings tab, select `realm-management` from the Client Roles.
4. Scroll down in Available Roles, find `view-users` and add it into Assigned Roles.

Alternatively, this can be applied as a default value for all newly registered users;

1. From a selected realm, go to Manage ⟶ Roles.
2. Select `realm-management` from the Client Roles.
3. Scroll down in Available Roles, find `view-users` and add it into Client Default Roles.

Get the access token:

```bash
curl --location --request POST '<KEYCLOAK_SERVER>/auth/realms/<REALM>/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'username=<USERNAME>' \
--data-urlencode 'password=<PASSWORD>' \
--data-urlencode 'client_id=<CLIENT_ID>' \
--data-urlencode 'client_secret=<CLIENT_SECRET>'
```

Use the access token to get the user list:

```bash
curl --location --request GET '<KEYCLOAK_SERVER>/auth/admin/realms/<REALM>/users' \
--header 'Authorization: Bearer <ACCESS_TOKEN>'
```

#### Get a specific user info

Get the access token:

```bash
curl --location --request POST '<KEYCLOAK_SERVER>/auth/realms/<REALM>/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'username=<USERNAME>' \
--data-urlencode 'password=<PASSWORD>' \
--data-urlencode 'client_id=<CLIENT_ID>' \
--data-urlencode 'client_secret=<CLIENT_SECRET>'
```

Grab the user ID and use it to get the respective user info:

```bash
curl --location --request GET 'https://<KEYCLOAK_SERVER>/auth/admin/realms/<REALM>/users/<USER_ID>' \
--header 'Authorization: Bearer <ACCESS_TOKEN>'
```

#### Get user roles from a specific user

Get the access token:

```bash
curl --location --request POST '<KEYCLOAK_SERVER>/auth/realms/<REALM>/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'username=<USERNAME>' \
--data-urlencode 'password=<PASSWORD>' \
--data-urlencode 'client_id=<CLIENT_ID>' \
--data-urlencode 'client_secret=<CLIENT_SECRET>'
```

Grab the user ID and use it get the user roles:

```bash
curl --location --request GET '<KEYCLOAK_SERVER>/auth/admin/realms/<REALM>/users/<USER_ID>/role-mappings' \
--header 'Authorization: Bearer <ACCESS_TOKEN>'
```



### Quick Deployment of Keycloak via Docker Compose

Example of `docker-compose.yml` file:

```yaml
version: '3.5'

volumes:
  pgkeycloak-data:
    name: acme_pgkeycloak-data
 
networks:
  acme:
    driver: bridge
    name: acme_network

services:

  pgkeycloak:
    image: postgres:12-alpine
    container_name: keycloak_database
    volumes:
      - pgkeycloak-data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: keycloak
      POSTGRES_USER: keycloakdb
      POSTGRES_PASSWORD: ${KEYCLOAK_DB_PASSWORD}
    ports:
      - "5432:5432"
    networks:
      - acme
 
  keycloak:
    container_name: keycloak_service
    image: keycloak:latest
    environment:
      KEYCLOAK_USER: ${KEYCLOAK_ADMIN_USER}
      KEYCLOAK_PASSWORD: ${KEYCLOAK_ADMIN_PASS}
      PROXY_ADDRESS_FORWARDING: "true"
      DB_USER: keycloakdb
      DB_PASSWORD: ${KEYCLOAK_DB_PASSWORD}
      DB_DATABASE: keycloak
      DB_ADDR: pgkeycloak
      DB_VENDOR: postgres
      DB_SCHEMA: public
    ports:
      - "8080:8080"
      - "8443:8443"
    networks:
      - acme
    depends_on:
      - pgkeycloak
```

You can use following docker-compose CLI to get started:

```bash
$ docker-compose -f path/to/docker-compose.yml up -d
```



There are a lot of great resources that you could find online (_simply google it_) to learn more about Keycloak, and the best way to start is to visit [its official website](https://www.keycloak.org/).