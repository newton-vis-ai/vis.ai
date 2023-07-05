import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { AlertService } from './alert.service';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  private _keys: string[] = [];
  private _path: string = "";
  private _data: any;
  private _numElementsCsv: number = 0

  constructor(
    private as: AlertService,
    private cookie: CookieService
  ) { }

  async import(path: string): Promise<boolean> {
    this._path = path;
    try {
      const res = await d3.csv(this._path);
      this._data = res;
      this._numElementsCsv = res.length;
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  get columns(): string[] | undefined {
    if (this._data) {
      this._keys = Object.keys(this._data[0]);
      return this._keys;
    } else {
      return undefined;
    }
  }


  get data(): any {
    return this._data;
  }

  get lenCsv(): number {
    return this._numElementsCsv;
  }

  async uploadAlert() {
    const result = await this.as.csvAlert();

    if (result.isConfirmed) {
      const { dropdownValue, textInputValue }: any = result.value;

      if (textInputValue !== "")
        this.cookie.setCookie("dataset", textInputValue, 1000);
      else
        this.cookie.setCookie("dataset", dropdownValue, 1000);

      await this.import(this.cookie.getCookie("dataset"));
    }
    console.log(this._data);
    console.log(this._keys);
    return result;
  }



}
