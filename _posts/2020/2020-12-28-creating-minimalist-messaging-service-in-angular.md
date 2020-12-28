---
layout: post
title: Creating a minimalist Messaging Service in Angular
description: Another method of communication to minimize the number of susbcriptions and make the service subscriptions are more cleaner.
tags: [Angular, TypeScript, Best Practices, Programming]
comments: true
---

Messaging service is just another method of communications that we can use to minimize the number of subscriptions in our components. This method also can make our service subscriptions are more cleaner.

<hr class="break">

### MessagingService class

File: _messaging.service.ts_

```ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

interface Message {
  channel: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private message$: Subject<Message>;

  constructor() {
    this.message$ = new Subject<Message>();
  }

  public publish<T>(message: T): void {
    const channel = (<any>message.constructor).name;
    this.message$.next({ channel: channel, data: message });
  }

  public of<T>(messageType: { new(...args: any[]): T }): Observable<T> {
    const channel = (<any>messageType).name;
    return this.message$.pipe(
      filter((m: Message) => m.channel === channel),
      map((m: Message) => m.data)
    );
  }

}
```

<hr class="break">

### Usage example through MessageBus data model

File: _app.component.ts_

```ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessagingService } from './services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public result1: any;
  public result2: any;

  constructor(
    private messagingService: MessagingService
  ) { }

  ngOnInit() {
    this.messagingService.of(MessageBus).pipe(takeUntil(this.destroyed$)).subscribe(result => {
      if (result.channelName === 'ChannelA') {
        this.result1 = result.data.payload;
      }
      if (result.channelName === 'ChannelB') {
        this.result2 = result.data.payload;
      }
    });
  }
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  callEvent1() {
    this.messagingService.publish(new MessageBus('ChannelA', { payload: 'A' }));
  }
  callEvent2() {
    this.messagingService.publish(new MessageBus('ChannelB', { payload: 'B' }));
  }

}

class MessageBus {
  public channelName: string;
  public data: any;
  constructor(channelName: string, data: any) {
    this.channelName = channelName;
    this.data = data;
  }
}
```