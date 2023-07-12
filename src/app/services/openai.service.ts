import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


import { Configuration, OpenAIApi } from 'openai';
import { openAIToken } from 'src/environments/environment';
import { filter, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  
  readonly configuration = new Configuration({
    apiKey: openAIToken
  });

  readonly openai = new OpenAIApi(this.configuration);


  constructor(private http: HttpClient) {
  }

  async getDataFromOpenAPI(text: string) {

    console.log(text)
    return new Promise<string>((resolve, reject) => {
      
      from(this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt: text,
        temperature: 0,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
        stop: [
          'You:'
        ]
      })).pipe(
        filter(resp => !!resp && !!resp.data),
        map(resp => resp.data),
        filter((data: any) => data.choices && data.choices.length > 0 && data.choices[0].text),
        map(data => data.choices[0].text)
      ).subscribe(data => {
          resolve(data);
      });
    });
  }

  

}
