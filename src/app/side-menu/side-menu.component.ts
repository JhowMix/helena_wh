import {Component, OnInit} from '@angular/core';
import {SideMenuOption} from '../model/side-menu-option.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  options: SideMenuOption[] = [
    {label: 'Fornecedores', routeLink: 'fornecedores/novo', icon: 'groups', selected: false},
    {label: 'Itens', routeLink: 'itens', icon: 'all_inbox', selected: false}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  selectView(index: number): void {
    for(const option of this.options) {
      option.selected = false;
    }

    this.options[index].selected = true;
  }
}
