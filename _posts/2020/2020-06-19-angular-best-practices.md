---
layout: post
title: Angular best practices
description: A collection of some Angular best practices that I have been using while working with Angular-based projects.
tags: [angular, typescript, best-practices, programming]
---

## 1. Maintain a Scalable Project Structure

Organize your project's files into a clear and scalable folder structure. Here's an example:

```
angular-project
├── core
│   └─── services
├── feature-a
│   └─── components
│       ├── feature-a
│       │   ├── feature-a-component-a.component.ts
│       │   └── feature-a-component-b.component.ts
│   └─── feature-a-routing.module.ts
│   └─── feature-a.module.ts
├── shared
│   └─── components
│       ├── button-a.component.ts
│       └── button-b.component.ts
│   └─── shared.module.ts
├── assets
├── environments
└─── styles
```

This structure separates concerns into three main modules:

* **Core Module:** Houses essential application services.
* **Shared Module:** Contains reusable components used across the application.
* **Feature Modules:** Group functionalities and components specific to a particular feature. 

## 2. Shorten Long Relative Imports

As your project grows, nested modules can lead to lengthy relative imports. To address this:

Update your `tsconfig.json` with `baseUrl` and `paths` configurations. This allows for shorter imports using aliases like `@shared`.

## 3. Simplify Imports with `index.ts` Files

Within folders containing multiple TypeScript files, create an `index.ts` file to manage imports and exports. This helps streamline imports in other parts of your application.

## 4. Prioritize Code Clarity

* **Meaningful Naming:** Employ consistent and descriptive names for variables, functions, components, and modules.
* **Self-Documenting Code:** Write code that is easy to understand without extensive comments.
* **Constants:** Replace magic strings and numbers with constants for better readability and reusability.
* **Comments:** Use comments sparingly and focus on explaining "why" instead of "what." Regularly review and remove outdated comments.

## 5. Adhere to Angular Coding Style Guide

Refer to the official Angular Coding Style Guide ([https://angular.io/guide/styleguide](https://angular.io/guide/styleguide)) for best practices on code formatting, conventions, and organization. This guide provides explanations for the "why" behind the recommendations.

## 6. Utilize `trackBy` in `*ngFor`

By default, `*ngFor` re-renders the entire DOM when the `dataSource` changes. Implement `trackBy` to optimize performance and only re-render affected elements.

## 7. Prevent Memory Leaks in Observables

While Angular handles unsubscription with the `async` pipe, manual subscriptions require proper management. To avoid memory leaks:

* Use the `take(1)` operator to complete the subscription after receiving the first emitted value.
* Employ the `takeUntil(...)` operator to automatically unsubscribe when a specified condition (e.g., component destruction) is met.

## 8. Maintain Code Quality with Linting

* Regularly run the `ng lint` command to identify and fix code linting errors.
* Update your `tslint.json` file to customize linting rules instead of using in-code comments to disable checks.
* Keep your TypeScript, HTML, and SCSS code clean and well-formatted.

By following these best practices, you can develop robust, maintainable, and performant Angular applications.
