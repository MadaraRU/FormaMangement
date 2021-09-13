import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as $ from 'jquery'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  dureeData = ["Duree", "1", "2", "3"];
  typeData = ["Type", "BTS", "BTP"];
  spacialiteData = ["Specialite", "Informatique", "Gestion"];
  typeDefault = this.typeData[0];
  dureeDefault = this.dureeData[0];
  specialiteDefault = this.spacialiteData[0];
  fId;

  formations;
  private baseUrl = "http://127.0.0.1:8000/"
  constructor(private Http: HttpClient) {
    Http.get(this.baseUrl + "formation/").subscribe(
      resp => {
        console.log(resp);
        this.formations = resp;
      }
    )
  }

  delete(id) {
    this.Http.delete(this.baseUrl + "formation/delete/" + id).subscribe(
      resp => {
        // let index = this.formations.indexof(id);
        // this.formations.splice(index, 1);
        console.log("formation deleted")
      }

    )
    window.location.reload();
  }

  add() {
    let nf = (document.getElementById("nf") as HTMLInputElement).value;
    let tf = (document.getElementById("tf") as HTMLInputElement).value;
    let sf = (document.getElementById("sf") as HTMLInputElement).value;
    let df = (document.getElementById("df") as HTMLInputElement).value;
    var parsedDuree: number = +df;

    let forma: any = {
      "id": 0,
      "name": nf,
      "type": tf,
      "duration": parsedDuree,
      "speciality": sf
    };
    this.Http.post(this.baseUrl + "formation/add/", forma).subscribe(
      resp => {
        console.log("formation added");
        (document.getElementById("nf") as HTMLInputElement).value = "";
        (document.getElementById("tf") as HTMLInputElement).value = "";
        (document.getElementById("sf") as HTMLInputElement).value = "";
        (document.getElementById("df") as HTMLInputElement).value = "";

      }
    )
    window.location.reload();
  }
  getFormationById(id) {
    this.Http.get(this.baseUrl + "formation/{formaId}?formId=" + id).subscribe(
      resp => {
        console.log(resp);
        (document.getElementById("enf") as HTMLInputElement).value = resp[1].toString();
        (document.getElementById("etf") as HTMLInputElement).value = resp[2].toString();
        (document.getElementById("esf") as HTMLInputElement).value = resp[4].toString();
        (document.getElementById("edf") as HTMLInputElement).value = resp[3].toString();
        this.fId = resp[0]
        console.log("r:" + this.fId);

      }
    )

  }



  update() {
    let nf = (document.getElementById("enf") as HTMLInputElement).value;
    let tf = (document.getElementById("etf") as HTMLInputElement).value;
    let sf = (document.getElementById("esf") as HTMLInputElement).value;
    let df = (document.getElementById("edf") as HTMLInputElement).value;
    var parsedDuree: number = +df;

    let forma: any = {
      "id": 0,
      "name": nf,
      "type": tf,
      "duration": parsedDuree,
      "speciality": sf
    };
    this.Http.put(this.baseUrl + "formation/update/" + this.fId, forma).subscribe(
      resp => {
        console.log("formation updated");
        console.log("u:" + this.fId);


      }
    )
    window.location.reload();



  }






















  ngOnInit(): void {
  }



}
