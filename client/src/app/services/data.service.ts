import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Patient } from "../models/patient";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";

@Injectable()
export class DataService {
  private readonly API_URL = "http://localhost:8081/api/v1/patients";

  dataChange: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {}

  get data(): Patient[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllPatients(): void {
    this.httpClient.get<any>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data.patients);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  addPatient(patient: Patient): void {
    this.httpClient.post(this.API_URL + "/", patient).subscribe(
      (data) => {
        this.dialogData = patient;
        console.log("Successfully added");
      },
      (err: HttpErrorResponse) => {
        console.log("Error occurred. Details: " + err.name + " " + err.message);
      }
    );
  }

  updatePatient(patient: Patient): void {
    this.httpClient.put(this.API_URL + "/" + patient.id, patient).subscribe(
      (data) => {
        this.dialogData = patient;
        console.log("Successfully edited");
      },
      (err: HttpErrorResponse) => {
        console.log("Error occurred. Details: " + err.name + " " + err.message);
      }
    );
  }

  deletePatient(id: number): void {
    this.httpClient.delete(this.API_URL + "/" + id).subscribe(
      (data) => {
        console.log(data[""]);
        console.log("Successfully deleted");
      },
      (err: HttpErrorResponse) => {
        console.log("Error occurred. Details: " + err.name + " " + err.message);
      }
    );
  }
}
