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
  lenCsv = 100;
  constructor(private http: HttpClient,
    public csv: CsvService) {}

  ngOnInit(): void {
    // this.csv.import("").then(res => {
    //   console.log(res);
    //   console.log(this.csv.data);
    //   console.log(this.csv.columns);

   
    // });
  }

  next(){
    if(this.index2 < this.csv.lenCsv){
      this.index1 += 5;
      this.index2 += 5;
    }
    
  }

  previous(){
    if(this.index1 > 0){
      this.index1 -= 5;
      this.index2 -= 5;
    }
    
  }

  
}
