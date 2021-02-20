import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/model/item.model';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  animations: [
    trigger('itensTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('150ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ItemListComponent implements OnInit {
  columnsToDisplay: string[] = ['id', 'name', 'details'];
  itens: Item[] = [];
  isLoadingItens = false;

  constructor(
    private itemSvc: ItemService,
    private _route: Router
  ) { }

  ngOnInit(): void {
    this.isLoadingItens = true;
    this.itemSvc.all().subscribe(res => {
      this.itens = res
      this.isLoadingItens = false;
    }, error => {
      console.error(error);
      this.isLoadingItens = false;
    });
  }

  async forward(): Promise<any> {
    await this._route.navigate(['itens', 'novo']);
  }
}
