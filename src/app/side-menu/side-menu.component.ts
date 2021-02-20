import {Component, OnInit} from '@angular/core';
import {SideMenuOption} from '../model/side-menu-option.model';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  options: SideMenuOption[] = [
    {label: 'Fornecedores', routeLink: '/fornecedores', icon: 'groups', selected: false},
    {label: 'Itens', routeLink: '/itens', icon: 'all_inbox', selected: false}
  ];

  constructor(
    private route: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.checkURL();
  }

  async selectView(index: number): Promise<any> {
    for (const option of this.options) {
      option.selected = false;
    }

    this.options[index].selected = true;

    await this.route.navigate(this.options[index].routeLink.split('/'));
  }

  private checkURL(): void {
    const path = this.location.path();

    for (const option of this.options) {
      if (option.routeLink === path) {
        option.selected = true;
      }
    }
  }
}
