import { Component } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { CookieService } from '../services/cookie.service';
import embed from 'vega-embed';
import {Config, TopLevelSpec, compile} from 'vega-lite';
import { OpenaiService } from '../services/openai.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isSidebarOpen = true;
  isTyping = false;

  history = [
    {"isUser": true, "text":"ciao"},
    {"isUser": false, "text":"come stai"},
    {"isUser": true, "text":"bene grazie"},
  ]

  
  
  constructor(private as:AlertService,
              private cs:CookieService,
              private openai: OpenaiService){
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

    // const vegaLiteSpec: TopLevelSpec = {
    //   $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    //   data: {
    //     values: [
    //       {a: 'A', b: 28},
    //       {a: 'B', b: 55},
    //       {a: 'C', b: 43},
    //       {a: 'D', b: 91},
    //       {a: 'E', b: 81},
    //       {a: 'F', b: 53},
    //       {a: 'G', b: 19},
    //       {a: 'H', b: 87},
    //       {a: 'I', b: 52}
    //     ]
    //   },
    //   mark: 'bar',
    //   encoding: {
    //     x: {field: 'a', type: 'nominal', axis: {labelAngle: 0}},
    //     y: {field: 'b', type: 'quantitative'}
    //   }
    // };
    
    const config: Config = {
      bar: {
        color: 'firebrick'
      }
    };

    // const vegaSpec = compile(vegaLiteSpec, {config}).spec;

    // vegaEmbed('#vis', vlSpec);
    // await embed('#vis', vegaSpec);

    const specString = `
      {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A simple bar chart with embedded data.",
        "data": {
          "values": [
            {"category": "A", "value": 20},
            {"category": "B", "value": 14},
            {"category": "C", "value": 12},
            {"category": "D", "value": 19},
            {"category": "E", "value": 30},
            {"category": "F", "value": 31},
            {"category": "G", "value": 16},
            {"category": "H", "value": 25}
          ]
        },
        "mark": "bar",
        "encoding": 
          "x": {"field": "category", "type": "nominal"},
          "y": {"field": "value", "type": "quantitative"}
        }
      }`;
      const spec11 = JSON.parse(specString);


    const vegaSpec2 = compile(spec11, {config}).spec;
    console.log(vegaSpec2)



  }

  async embedGraph(): Promise<void> {
    const spec = "https://vega.github.io/schema/vega-lite/v5.json";
    // embed.vegaEmbed("figure#vega", spec);
    const result = await embed("vis#vega", spec);
    console.log(result.view);
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
