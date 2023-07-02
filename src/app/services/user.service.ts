import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSessionId: string = "";

  constructor() { }

  setSessionId(){
    this.userSessionId = "id" + Math.random().toString(16).slice(2);
  }

  get sessionId(){
    return this.userSessionId;
  }
}
