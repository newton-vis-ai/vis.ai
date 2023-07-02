import { Injectable } from '@angular/core';
import embed from 'vega-embed';
import {Config, TopLevelSpec, compile} from 'vega-lite';


@Injectable({
  providedIn: 'root'
})
export class VegaliteService {

  

  
  constructor() { }

  test () {
    const config: Config = {
      bar: {
        color: 'firebrick'
      }
    };

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
}
