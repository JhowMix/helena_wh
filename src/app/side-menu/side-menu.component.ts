import {Component, OnInit} from '@angular/core';
import {SideMenuOption} from '../model/side-menu-option.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  options: SideMenuOption[] = [
    {label: 'Fornecedores', routeLink: 'fornecedores', icon: 'groups'},
    {label: 'Itens', routeLink: 'itens', icon: 'all_inbox'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
