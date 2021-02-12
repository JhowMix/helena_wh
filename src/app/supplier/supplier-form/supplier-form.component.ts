import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss'],
  animations: [
    trigger('cardTrigger', [
      transition(':enter', [
        style({ height: 0 }),
        animate('150ms ease-out', style({ height: '90%' }))
      ]),
      transition(':leave', [
        style({ height: '90%' }),
        animate('200ms 100ms ease-out', style({ height: 0 }))
      ]),
    ]),
    trigger('cardContentTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('170ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SupplierFormComponent implements OnInit {

  isContentVisible = false;
  isFetchingAddress = false;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isContentVisible = true;
    }, 200);
  }

  fetchLocation(): void {
    this.isFetchingAddress = true;

    setTimeout(() => {
      this.isFetchingAddress = false;
    }, 3000);

  }
}
