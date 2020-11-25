import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivityService} from '../services/activity.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  formGroup: FormGroup;
  bikeName: string;
  uploading = false;

  constructor(
    private fb: FormBuilder,
    private service: ActivityService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.formGroup = this.fb.group({
      requiredFile: [undefined, [Validators.required]]
    });
    this.bikeName = route.snapshot.params.bikeName;
  }

  ngOnInit(): void {
  }

  public checkError(controlName: string): boolean {
    return this.formGroup.controls[controlName].invalid;
  }

  upload(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const file = this.formGroup.controls.requiredFile.value.files[0];
    console.log(file);
    // todo: progress bar and clear
    this.uploading = true;
    this.service.uploadFile(this.bikeName, file).subscribe(
      data => {
        console.log(data);
        this.uploading = false;
        this.formGroup.reset();
        this.formGroup.updateValueAndValidity();
        this.snackBar.open('Successful upload', 'Close.');
      },
      error => {
        console.log(error);
        this.uploading = false;
        this.snackBar.open(
          (error.status === 401 || error.status === 403) ?
            'Unauthorized' : 'Si è verificato un errore', 'Close.');
      }
    );
  }

}
