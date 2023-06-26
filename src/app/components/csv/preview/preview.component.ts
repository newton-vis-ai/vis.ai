import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CsvService } from 'src/app/services/csv.service';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent  implements OnInit {

  index1 = 0;
  index2 = 5;

  constructor(private http: HttpClient,
    public csv: CsvService) {}

  ngOnInit(): void {
    this.csv.import("https://gist.githubusercontent.com/rnirmal/e01acfdaf54a6f9b24e91ba4cae63518/raw/6b589a5c5a851711e20c5eb28f9d54742d1fe2dc/datasets.csv").then(res => {
      console.log(res);
      console.log(this.csv.data);
      console.log(this.csv.columns);

   
    });
  }

  next(){
    this.index1 = 5;
    this.index2 = 10;
  }

  previous(){

  }

  
}
