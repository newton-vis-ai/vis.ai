import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class D3Service {

  constructor() { }

  readCsv(path:string) {
    return d3.csv(path);
  }

  

}
