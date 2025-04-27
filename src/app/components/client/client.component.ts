import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';
import { AsyncPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AlertBoxComponent } from "../alert-box/alert-box.component";
import { MyButtonComponent } from "../my-button/my-button.component";

@Component({
  selector: 'app-client',
  imports: [FormsModule, UpperCasePipe, DatePipe, JsonPipe, AsyncPipe, AlertBoxComponent, MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {
  clientObj: Client = new Client();
  clientList: Client[] = [];
  isLoader: boolean = true;
  currentDate: Date = new Date();
  userList$: Observable<any> = new Observable<any>();

  clientService = inject(ClientService);

  ngOnInit(): void {
    this.loadClients(true);
    this.userList$ = this.clientService.getAllUser();
  }

  loadClients(stopLoading: boolean = false){
    this.clientService.getAllClients().subscribe((res: APIResponseModel) => {
      this.clientList = res.data;
      if(stopLoading == true) this.isLoader = false;
    })
  }

  onSaveClient(data: any) {
    this.isLoader = true;
    this.clientService.addUpdateClient(this.clientObj).subscribe((res: APIResponseModel) => {
      if(res.result){
        alert("Client Created Successfully!");
        this.loadClients();
        this.clientObj = new Client();
      } else {
        alert(res.message);
      }

      this.isLoader = false;
    })
  }

  onEdit(client: Client) {
    this.clientObj = client;
  }

  OnDelete(clientId: number) {
    const isDelete = confirm("Are you sure want to delete");
    if(isDelete) {
      this.isLoader = true;
      this.clientService.DeleteClientByClientId(clientId).subscribe((res: APIResponseModel) => {
        if(res.result){
          alert("Client Deleted Successfully!");
          this.loadClients();
        } else {
          alert(res.message);
        }
  
        this.isLoader = false;
      })
    }
  }

  onReset() {
    this.clientObj = new Client();
  }
}
