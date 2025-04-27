import { Component, Input } from '@angular/core';

@Component({
  selector: 'alert-box',
  imports: [],
  templateUrl: './alert-box.component.html',
  styleUrl: './alert-box.component.scss'
})
export class AlertBoxComponent {
@Input() btnText: string = '';
@Input() alertType: string = '';

}
