import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-block-view',
  templateUrl: './loading-block-view.component.html',
  styleUrls: ['./loading-block-view.component.scss']
})
export class LoadingBlockViewComponent implements OnInit {

  @Input() visible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


}
