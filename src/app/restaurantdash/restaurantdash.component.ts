import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestauranData } from './restaurant.model';
@Component({
  selector: 'app-restaurantdash',
  templateUrl: './restaurantdash.component.html',
  styleUrls: ['./restaurantdash.component.css']
})
export class RestaurantdashComponent implements OnInit {
  formValue!: FormGroup
  restaurantObj: RestauranData = new RestauranData;
  allRestaurantData: any;
  showAdd !:boolean;
  showbtn!:boolean;
  //create restaurant object and inject api service
  constructor(private formBuilder:FormBuilder,private api:ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      service:[''],
    })
    this.getAllData();
  }
  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;

  }

  //s:3 no subscribing our data which is mapped by services
  addResto(){
    this.restaurantObj.name = this.formValue.value.name;
    this.restaurantObj.email = this.formValue.value.email;
    this.restaurantObj.mobile = this.formValue.value.mobile;
    this.restaurantObj.address = this.formValue.value.address;
    this.restaurantObj.service = this.formValue.value.service;

    this.api.postRestauarnt(this.restaurantObj).subscribe(res=>{
      console.log(res);
      alert("Restaurant records are added sucessfully!!");
     // this.formValue.reset();
     //clear fill form data to 0
     let ref = document.getElementById('clear');
    },err =>{
      alert("Something went Wrong!!")
    })

  }
  //get all data
  getAllData(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestaurantData = res;
    })
  }
  deleteResto(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res =>{
      alert("Restaurant Records Deleted");
      this.getAllData();
    })
  }
  onEditResto(data:any){
    this.showAdd=false;
    this.showbtn=true;
    this.restaurantObj.id = data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['name'].setValue(data.email);
    this.formValue.controls['name'].setValue(data.mobile);
    this.formValue.controls['name'].setValue(data.address);
    this.formValue.controls['name'].setValue(data.service);



  }
  updateResto(){
    this.restaurantObj.name = this.formValue.value.name;
    this.restaurantObj.email = this.formValue.value.email;
    this.restaurantObj.mobile = this.formValue.value.mobile;
    this.restaurantObj.address = this.formValue.value.address;
    this.restaurantObj.service = this.formValue.value.service;

    this.api.updateRestaurant(this.restaurantObj,this.restaurantObj.id).subscribe(res=>{
      alert("Restaurant Records are added successfully")
    })

  }

}
