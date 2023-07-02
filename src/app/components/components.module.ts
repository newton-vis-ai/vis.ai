import { NgModule, CUSTOM_ELEMENTS_SCHEMA,LOCALE_ID} from "@angular/core";


import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { PreviewComponent } from '../components/csv/preview/preview.component';


@NgModule({
    imports: [CommonModule,FormsModule, ReactiveFormsModule,
       
        ],
    declarations:[PreviewComponent],
    exports: [PreviewComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{
      provide: LOCALE_ID,
      useValue: 'it-IT' // 'de-DE' for Germany, 'fr-FR' for France ...
    },
  ]
})
export class ComponentsModule{}