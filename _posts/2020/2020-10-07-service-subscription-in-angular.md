---
layout: post
title: Service subscription in Angular using ReplaySubject(1) and takeUntil pipe
description: Tips on how to do proper service subscription in Angular component using ReplaySubject(1) and takeUntil pipe.
tags: [angular, typescript, best-practices, coding-tips]
---

Service subscription is quite common in [Angular](https://angular.io/) development. However, if you are implementing incorrectly, it could cause the memory leak to be happened in your application. So, it is really important for you to know a proper way to do a service subscription in your Angular components. In this post, I would like to share one of the methods that I usually use when I work on the Angular project.

**Assumption:** Lets say in your Angular project, you have a `ComponentA` that is going to subscribe to an event from a `ServiceX`. Lets say this event is called `onSomethingChanged`.

Example of an event declaration in your `ServiceX`:

```js
private _onSomethingChanged = new Subject<T>();
public onSomethingChanged = this._onSomethingChanged.asObservable();
```

## Here are what you need to do in your `ComponentA`

(1) Import the following [RxJS](https://rxjs.dev/guide/overview) modules. We're going to use `ReplaySubject` and `takeUntil` pipe.

```js
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil } from 'rxjs/operators';
```

(2) Your _ComponentA_ needs to implement both `OnInit` and `OnDestroy`.

```js
@Component({
  selector: '...',
  templateUrl: '...',
  styleUrls: ['...']
})
export class ComponentA implements OnInit, OnDestroy {
    ...
}
```

(3) Add this declaration on top of your _ComponentA constructor_.

```js
private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
```

(4) Put this in your `ngOnDestroy()` function.

```js
ngOnDestroy() {
  this.destroyed$.next(true);
  this.destroyed$.complete();
}
```

(5) Inject your `ServiceX` into your _ComponentA_ `constructor`.

```js
constructor(
  private serviceX: ServiceX
) { }
```

(6) Finally, you can subscribe to `onSomethingChanged` event from your _ServiceX_ in your `ngOnInit()` function.

```js
ngOnInit() {
  this.serviceX.onSomethingChanged
    .pipe(takeUntil(this.destroyed$))
    .subscribe(result => {
        console.log(result);
  });
}
```

This assumes you want to listen to `onSomethingChanged` event from the beginning of your _ComponentA_ is loaded. So, whenever your _ComponentA_ is unloaded, the subscription to the event will be destroyed automatically.

## The Differences: _Subject_ vs _BehaviorSubject_ vs _ReplaySubject_

| `Subject` | A subscriber will only get published values that were emitted **after** the subscription. |
| `BehaviorSubject` | The last value is cached. A subscriber will get the latest value **upon** initial subscription. BehaviorSubject requires an initial value to be defined. |
| `ReplaySubject` | It can cache up to a specified number of published values or emissions. Any subscriber will get **all** the cached values **upon** subscription. |

Initializing _ReplaySubject_ with a buffer size of `1` actually computes a similar behavior as _BehaviorSubject_ as the last value is always cached, so it acts like a value changing over time. The only difference is that, it does not need for **null checking** compared to the _BehaviorSubject_ which requires the subscriber to perform null checking if the initial value is set to `null`.