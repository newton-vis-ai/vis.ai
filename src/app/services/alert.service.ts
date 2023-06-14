import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  errorAlert(title: string, message: string){
    return Swal.fire({
      heightAuto: false,
      customClass: 'visai-settings-form',
      confirmButtonColor: 'var(--orma-green)',
      icon: 'error',
      title: title,
      text: message
    });
  }

  addOpenAIkey(){
    return Swal.fire({
      title: "OpenAI secret key",
      text: "Insert here your OpenAI secret key. This key is not shared with us and it is stored only on your pc",
      input: 'text',
      customClass: 'visai-settings-form',
      confirmButtonText: "Save",
      confirmButtonColor: 'var(--color-primary)',
      heightAuto: false,      
      backdrop: true
    })
  }

  info(){
    return Swal.fire({
      heightAuto: false,
      customClass: 'visai-settings-form',
      confirmButtonColor: 'var(--orma-green)',
      icon: 'info',
      title: "Done!",
      text: "Operation completed correctly"
    });
  }
  
}
