import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/Model/restaurant.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css'],
})
export class RestaurantDashComponent implements OnInit {
  formValue!: FormGroup;

  public restaurant: Restaurant = new Restaurant();

  public restaurantData: any;

  public showAddDetailsButton!: boolean;

  public showUpdateButton!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    });
    this.getData();
  }

  clickAddRestaurant() {
    this.formValue.reset();
    this.showAddDetailsButton = true;
    this.showUpdateButton = false;
  }

  addRestaurant() {
    this.restaurant.name = this.formValue.value.name;
    this.restaurant.email = this.formValue.value.email;
    this.restaurant.mobile = this.formValue.value.mobile;
    this.restaurant.address = this.formValue.value.address;
    this.restaurant.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurant).subscribe(
      (res) => {
        let ref = document.getElementById('clear');
        ref?.click;
        this.formValue.reset();
        this.getData();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getData() {
    this.api.getRestaurant().subscribe(
      (res) => {
        this.restaurantData = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteData(data: any) {
    this.api.deleteRestaurant(data.id).subscribe((res) => {
      this.getData();
    });
  }

  editData(data: any) {
    this.showAddDetailsButton = false;
    this.showUpdateButton = true;
    this.restaurant.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updateData() {
    this.restaurant.name = this.formValue.value.name;
    this.restaurant.email = this.formValue.value.email;
    this.restaurant.mobile = this.formValue.value.mobile;
    this.restaurant.address = this.formValue.value.address;
    this.restaurant.services = this.formValue.value.services;

    this.api
      .updateRestaurant(this.restaurant, this.restaurant.id)
      .subscribe((res) => {
        let ref = document.getElementById('clear');
        ref?.click;
        this.formValue.reset();
        this.getData();
      });
  }

  logout() {
    alert('Are you sure, you want to logout');
    this.router.navigate(['login']);
  }
}
