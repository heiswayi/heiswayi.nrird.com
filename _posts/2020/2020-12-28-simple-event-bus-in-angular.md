---
layout: post
title: Creating a simple Event Bus in Angular
description: Event Bus provides a simple communication between Angular components.
tags: [angular, typescript, best-practices, coding-tips, programming]
---

Event Bus enables a simple intercomponent communication within Angular project using **`Subject`** and **`Subscription`** from RxJS.

## Creating Event Bus service

File: _event-bus.service.ts_

```ts
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class EventBusService {

  subject = new Subject<any>();

  constructor() {}

  on(event: Events, action: any): Subscription {
    return this.subject
      .pipe(
        filter((e: EmitEvent) => {
          return e.name === event;
        }),
        map((e: EmitEvent) => {
          return e.value;
        })
      )
      .subscribe(action);
  }

  emit(event: EmitEvent) {
    this.subject.next(event);
  }
}

export class EmitEvent {
  constructor(public name: any, public value?: any) {}
}

// this works like a communication channel
export enum Events {
  exampleEvent1,
  exampleEvent2
}
```

## Example: Broadcasting an event

File: _app.component.ts_

```ts
import { Component } from '@angular/core';
import { EventBusService, Events, EmitEvent } from './services/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private eventBusService: EventBusService
  ) { }

  broadcastSomeData(someData: any) {
    this.eventBusService.emit(new EmitEvent(Events.exampleEvent1, someData));
  }

}
```

## Example: Subscribing to an event

File: _other.component.ts_

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventBusService, Events } from './services/event-bus.service';

@Component({
  selector: 'other-component',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {

  private _eventBusSub: Subscription;
  dataToShow: any;

  constructor(
    private eventBusService: EventBusService
  ) { }

  ngOnInit() {
    this._eventBusSub = this.eventBusService.on(Events.exampleEvent1, (data: any) => {
      this.dataToShow = data;
    });
  }

  ngOnDestroy() {
    if (this._eventBusSub) { this._eventBusSub.unsubscribe(); }
  }

}
```