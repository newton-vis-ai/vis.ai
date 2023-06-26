import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  private _keys:string[] = [];
  private _path:string = "";
  private _data:any;

  constructor() { }

  async import(path:string):Promise<boolean>{
    this._path = path;
    try {
      const res = await d3.csv(this._path);
      this._data = res
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  get columns():string[] {
    this._keys = Object.keys(this._data[0]);
    return this._keys;
  }

  get data():any {
    return this._data;
  }


}
