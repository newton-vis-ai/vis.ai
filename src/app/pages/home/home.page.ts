import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { CookieService } from '../../services/cookie.service';

import { OpenaiService } from '../../services/openai.service';
import { CsvService } from 'src/app/services/csv.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isSidebarOpen = true;
  isTyping = false;
  isPreviewOpen = false;

  history = [
    {"isUser": true, "text":"ciao"},
    {"isUser": false, "text":"come stai"},
    {"isUser": true, "text":"bene grazie"},
  ]
  
  
  constructor(private as:AlertService,
              private cs:CookieService,
              private openai: OpenaiService,
              private csv: CsvService){
              }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  send(){
      this.openai.sendRequest("");
  }

  typing(event:any){
    this.isTyping = event.target.value !== "" ? true : false;
  }

  async generateVis(){
    console.log("devs")

  }

  setKey(){
    this.as.addOpenAIkey().then((result:any) => {
      if (result.value) {
          console.log("Result: " + result.value);
          this.cs.storeCookie("openAIkey", result.value) === true ? 
              this.as.info() : this.as.errorAlert("Not saved", "The key was not correctly saved. Retrie");
      }
    });
  }

}
