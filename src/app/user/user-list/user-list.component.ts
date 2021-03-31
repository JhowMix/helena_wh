import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [
    trigger('usersTrigger', [
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
export class UserListComponent implements OnInit {

  columnsToDisplay: string[] = ['id', 'username', 'name'];
  users: User[] = [];
  isLoadingUsers = false;

  constructor(
    private userSvc: UserService,
    private _route: Router
  ) { }

  ngOnInit(): void {
    this.isLoadingUsers = true;
    this.userSvc.all().subscribe(res => {
      this.users = res;
      this.isLoadingUsers = false;
    }, error => {
      console.error(error);
      this.isLoadingUsers = false;
    });
  }

  async forward(): Promise<any> {
    await this._route.navigate(['usuarios', 'novo']);
  }
}
