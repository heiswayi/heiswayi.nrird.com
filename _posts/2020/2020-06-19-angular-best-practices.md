---
layout: post
title: Angular Best Practices
description: A collection of some Angular best practices that I have been using while working with Angular-based projects.
tags: [Angular, TypeScript, Best Practices]
comments: true
---

Lately, I have been doing frontend development using Angular Framework. Sometimes I do backend development, but it is not as much as I did on the frontend development. So, here I want to note some Angular Best Practices that I have been practicing and I think they are worth to follow.



### 1. Angular scalable project structure

Angular project files should be organized into a proper folder structure that is easy to scale.

Example of organized folder structure:

```
angular-project
├───e2e
│   └───src
└───src
    ├───app
    │   ├───core
    │   │   └───services
    │   ├───feature-a
    │   │   └───components
    │   │       ├───feature-a
    │   │       ├───feature-a-component-a
    │   │       └───feature-a-component-b
    │   └───shared
    │       └───components
    │           ├───button-a
    │           └───button-b
    ├───assets
    ├───environments
    └───styles
```

As you can see, we have been splitting the project structure into three modules; **core**, **shared** and **feature module**.

Here the full project structure (folders + files):

```
angular-project
│   .editorconfig
│   .gitignore
│   angular.json
│   browserslist
│   package-lock.json
│   package.json
│   README.md
│   tsconfig.json
│   tslint.json
│
├───e2e
│   │   protractor.conf.js
│   │   tsconfig.e2e.json
│   │
│   └───src
│           app.e2e-spec.ts
│           app.po.ts
│
└───src
    │   favicon.ico
    │   index.html
    │   karma.conf.js
    │   main.ts
    │   polyfills.ts
    │   styles.scss
    │   test.ts
    │   tsconfig.app.json
    │   tsconfig.spec.json
    │   tslint.json
    │
    ├───app
    │   │   app-routing.module.ts
    │   │   app.component.html
    │   │   app.component.scss
    │   │   app.component.spec.ts
    │   │   app.component.ts
    │   │   app.module.ts
    │   │
    │   ├───core
    │   │   │   core.module.ts
    │   │   │
    │   │   └───services
    │   │           auth.service.spec.ts
    │   │           auth.service.ts
    │   │           index.ts
    │   │           local-storage.service.spec.ts
    │   │           local-storage.service.ts
    │   │
    │   ├───feature-a
    │   │   │   feature-a-routing.module.ts
    │   │   │   feature-a.module.ts
    │   │   │
    │   │   └───components
    │   │       │   index.ts
    │   │       │
    │   │       ├───feature-a
    │   │       │       feature-a.component.html
    │   │       │       feature-a.component.scss
    │   │       │       feature-a.component.spec.ts
    │   │       │       feature-a.component.ts
    │   │       │
    │   │       ├───feature-a-component-a
    │   │       │       feature-a-component-a.component.html
    │   │       │       feature-a-component-a.component.scss
    │   │       │       feature-a-component-a.component.spec.ts
    │   │       │       feature-a-component-a.component.ts
    │   │       │
    │   │       └───feature-a-component-b
    │   │               feature-a-component-b.component.html
    │   │               feature-a-component-b.component.scss
    │   │               feature-a-component-b.component.spec.ts
    │   │               feature-a-component-b.component.ts
    │   │
    │   └───shared
    │       │   shared.module.ts
    │       │
    │       └───components
    │           │   index.ts
    │           │
    │           ├───button-a
    │           │       button-a.component.html
    │           │       button-a.component.scss
    │           │       button-a.component.spec.ts
    │           │       button-a.component.ts
    │           │
    │           └───button-b
    │                   button-b.component.html
    │                   button-b.component.scss
    │                   button-b.component.spec.ts
    │                   button-b.component.ts
    │
    ├───assets
    │       .gitkeep
    │
    ├───environments
    │       environment.prod.ts
    │       environment.ts
    │
    └───styles
            variables.scss
```



### 2. Shorten the long relative paths

When the project has grown, we might have the nested modules and we might end-up with code like this:

```
import { FooPipe } from '../../../../../shared/pipes/foo/foo.pipe';
```

We should aim for something like this:

```
import { FooPipe } from '@shared/pipes/foo/foo.pipe';
```

This can be done by updating our `tsconfig.json` file into something like this:

```json
{
...
  "compilerOptions": {
    ...
    "baseUrl": "src",
    "paths": {
      "@env": ["environments/environment"],
      "@shared/*": ["app/shared/*"],
      "@core/*": ["app/core/*"]
    }
  }
}
```



### 3. Make use of `index.ts` file to simplify the imports

To simplify the imports, we can make use `index.ts` into each folder that contains ".ts" file.

Example of `index.ts`:

```js
// src/app/shared/components/index.ts

import { ButtonAComponent } from './button-a/button-a.component';
import { ButtonBComponent } from './button-b/button-b.component';
export const components: any[] = [ButtonAComponent, ButtonBComponent];
export * from './button-a/button-a.component';
export * from './button-b/button-b.component';
```

Example of `shared.module.ts`:

```js
// shared/shared.module.ts

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import * as fromComponents from './components';

@NgModule({
  declarations: [...fromComponents.components];
  imports: [CommonModule, FormsModule],
  exports: [FormsModule, ...fromComponents.components]
})
export class SharedModule {}
```



### 4. Provide clarity through the code first

- Use proper naming conventions and best practices.
- Write self-describing code.
- Replace "magic" strings or numbers with constants (code reusability).
- Explain in code, not in comments.
- Comments must be readable and maintained. Outdated and incorrect should be removed.
- Comments should be used to explain "why" instead of "what".



### 5. Follow the best practices provided by Angular Coding Style Guide

Page URL: [https://angular.io/guide/styleguide](ttps://angular.io/guide/styleguide)

Angular Coding Style Guide provides very good explanation if you are curious on "why".



### 6. Use `trackBy` in *ngFor

By default, when there is a change in `dataSource`, the entire DOM is re-rendered. With `trackBy`, at least only the affected DOM will be re-rendered.

Example use of `trackBy` in HTML:

```html
<ul><li *ngFor="let item of collection; trackBy: trackByFn">{{item.id}}</li></ul>
```

`trackByFn` method in TypeScript:

```js
trackByFn(index, item) { return index; }
```



### 7. Prevent memory leak in Angular Observable

While Angular takes care of unsubscribing when using the async pipe, it quickly becomes a mess when we have to do this on our own. Failing to unsubscribe will lead to memory leaks, as the Observable stream is left opened. Before `.subscribe(...)`, we could use `take(1)` or `takeUntil(...)` so that we could prevent the memory leak when we are subscribing to the event.

#### Example of `take(1)` pipe

```js
// add import
import { take } from 'rxjs/operators';

// example code usage:
// this will take the first emitted value then complete.
this.dataService.pipe(take(1)).subscribe(result => { console.log(result); });
```

#### Example of `takeUntil(...)` pipe

```js
// add import
import { takeUntil } from 'rxjs/operators';

// declare a subject to be used in ngOnDestroy()
private onDestroy$: Subject<void> = new Subject<void>();

// call the subject
ngOnDestroy() {
  this.onDestroy$.next();
}

// example code usage:
// this will take until the component destroyed then complete.
this.http.get('/userlist')
  .pipe(takeUntil(this.onDestroy$))
  .subscribe(result => {
    // do something
  });
```



### 8. Minimize use of logic in HTML templates

Using logic in HTML templates may introduce more complexity and makes the code less maintainability as the code becomes hard to adapt the change that comes it quickly.



### 9. Take care of code linting

- Use `ng lint` command to check for any code linting error and ensure that we don't have any error.
- If a certain linting rule does not apply, we should update `tslint.json` file instead of repetitively use comments to disable the linting error checking intellisense.
- Always tidy up the code - TypeScript, HTML and SCSS.
