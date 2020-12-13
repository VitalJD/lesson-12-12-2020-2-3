import { Component } from '@angular/core';
import { SerchService } from '../serch.service';

export class Users {
  userId: number;
  id: number;
  title: string;
  body: string;
  info = false;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
users: any[] = [];

  constructor(private serchservice: SerchService) {
    this.serchservice.load().subscribe((posts: Array<Users>) => {
      if (this.users != null) {
        this.users = posts;
      }
    });
  }

  getPost(user: Users) {
    user.info == !user.info;
  }
}
