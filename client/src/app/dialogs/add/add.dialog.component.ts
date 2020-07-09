import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { DataService } from "../../services/data.service";
import { FormControl, Validators } from "@angular/forms";
import { Patient } from "../../models/patient";

@Component({
  selector: "app-add.dialog",
  templateUrl: "../../dialogs/add/add.dialog.html",
  styleUrls: ["../../dialogs/add/add.dialog.css"],
})
export class AddDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient,
    public dataService: DataService
  ) {}

  formControl = new FormControl("", [
    Validators.required,
  ]);

  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("patientId")
        ? "Not a valid patientId"
      : "";
  }

  submit() {
    // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dataService.addPatient(this.data);
  }
}
