import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  constructor(private http: HttpClient) { }

  sendRequest(key:any){

  this.http
    .post('https://api.openai.com/v1/completions', 
      JSON.stringify({
        'model': 'text-davinci-003',
        'prompt': 'Ciao',
        'temperature': 0,
        'max_tokens': 150,
        'top_p': 1,
        'frequency_penalty': 0.5,
        'presence_penalty': 0,
        'stop': [
          'You:'
        ]
      }), { 
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ key
      }, 
    })
    .subscribe((response: any) => {
      console.log(response);
    });
  }
}
