import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponseModel, IRole } from '../../model/interface/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit {

  roleList: IRole [] = [];
  isLoader: boolean = true;
  http = inject(HttpClient);

  // constructor(private http: HttpClient){

  // }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.http.get<APIResponseModel>('https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles')
    .subscribe((res: APIResponseModel) => {
      this.roleList = res.data;
      this.isLoader = false;
    }, (err) => {
      console.error('api error: ', err);
      this.isLoader = false;
    });
  }



  // firstName: string = 'ayan';
  // isActive: boolean = true;
  // currentDate: Date = new Date();

  // showWelcomeAlert() {
  //   alert('showWelcomeAlert');
  // }

  // showMessage(message: string) {
  //   alert(message);
  // }
}
