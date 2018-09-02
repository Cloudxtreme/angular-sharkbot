import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { Chat } from '../shared/models/chat.model';
import { ChatRequest } from '../shared/models/chat-request.model';

const API_URL = environment.apiUrl;

export class Message {
  constructor(public content: string, public sentBy: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  conversation = new BehaviorSubject<Message[]>([]);

  conversationName = 'test-angular-' + Date.now();

  constructor(private http: Http) { }

  update(msg: Message) {
    this.conversation.next([msg]);
  }

  converse(msg: string, userName: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    var chat = new Chat('sharkbot', msg, userName, Date.now().toString());
    var chatRequest = new ChatRequest(chat, 'test', this.conversationName);

    return this.http.put(API_URL, chatRequest).subscribe((res) => this.update(new Message(res.json().response, 'sharkbot')));
  }
}
