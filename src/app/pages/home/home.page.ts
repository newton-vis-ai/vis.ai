import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { CookieService } from '../../services/cookie.service';

import { OpenaiService } from '../../services/openai.service';
import { CsvService } from 'src/app/services/csv.service';
import { login, supabase } from '../../config/supabase';

declare var $: any;
import { OpenAI } from "langchain/llms/openai";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('myTextarea') myTextarea!: ElementRef;

  isSidebarOpen = true;
  isTyping = false;
  isPreviewOpen = false;
  

  history:any = []
  
  
  constructor(private as:AlertService,
              private cs:CookieService,
              private openai: OpenaiService,
              public csv: CsvService,
              private cookie: CookieService){
                const model = new OpenAI({ openAIApiKey: "sk-...", temperature: 0.9 });
              }


  async report(vote: number, message_id: number): Promise<void> {

    const result = await this.as.inputAlert();

    const { data, error } = await supabase.from('report').insert(
      { vote: vote, report: result.value, message_id: message_id });

    if (error) {
      // TODO: @Luca dovresti poi aprire un alert di errore, anche generico
      throw new Error(error.message);
    }
  }

  async upload(): Promise<void> {
    await this.csv.uploadAlert();
    let jsonDataset = [];
    for (const col of this.csv.columns!) {
      const elem = {
        column: col,
        type: "txt"
      };
      jsonDataset.push(elem);
    }

    const { data, error } = await supabase.from('dataset').insert(
      {
        schema: jsonDataset,
        conversation_id: 1
      });
  }


  chat(userText:string){
    this.myTextarea.nativeElement.value = '';
    this.history.push(
      {"isUser": true, "text":userText},
    );
    this.openai.getDataFromOpenAPI(userText)
    .then(data => {
      this.history.push(
        {"isUser": false, "text":data},
      );
    })
   
  }

  setKey() {
    this.as.addOpenAIkey().then((result: any) => {
      if (result.value) {
        console.log("Result: " + result.value);
        this.cs.storeCookie("openAIkey", result.value) === true ?
          this.as.info() : this.as.errorAlert("Not saved", "The key was not correctly saved. Retrie");
      }
    });
  }

}
