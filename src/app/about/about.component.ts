import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SerchService } from '../serch.service';

export interface GettingUser {
  name: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: number
  }
  phone: number
  website: string
  company: {
    name: string
  }
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  private userInfo: any;
  private id: string;
  public user: FormGroup;
  private querySubscription: Subscription;

  constructor(private serchservice: SerchService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.querySubscription = this.route.queryParams.subscribe((queryParam: any) => {
      this.id = queryParam['id'];
    });
    this.serchservice.getUser(this.id).subscribe((user: GettingUser) => {
      this.userInfo = user;
      console.log(user);
      this.user = new FormGroup({
        name: new FormControl(user.name, [Validators.required]),
        email: new FormControl(user.email, [Validators.required, Validators.email]),
        street: new FormControl(user.address.street, [Validators.required]),
        suite: new FormControl(user.address.suite, [Validators.required]),
        city: new FormControl(user.address.city, [Validators.required]),
        zipcode: new FormControl(user.address.zipcode, [Validators.required]),
        phone: new FormControl(user.phone, [Validators.required]),
        website: new FormControl(user.website, [Validators.required]),
        company: new FormControl(user.company.name, [Validators.required]),
      });
        return user;
    });
  }

  ngOnDestroy(): void {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
