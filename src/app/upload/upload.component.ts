import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivityService} from '../services/activity.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';
import {MatSidenav} from '@angular/material/sidenav';
import {SidenavService} from '../services/sidenav.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  bikeName: string;
  uploading = false;
  subSidenav: Subscription;

  @ViewChild(MatSidenav)
  sidenav: MatSidenav;

  constructor(
    private fb: FormBuilder,
    private service: ActivityService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private sidenavService: SidenavService
  ) {
    this.formGroup = this.fb.group({
      requiredFile: [undefined, [Validators.required]]
    });
    this.bikeName = route.snapshot.params.bikeName;
    this.subSidenav = sidenavService.getMessage().subscribe(data => data.open ? this.sidenav.open() : this.sidenav.close());
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subSidenav.unsubscribe();
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
