import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {AliceComment} from '../models/aliceComment.model';
import {AliceService} from '../services/alice.service';
import {BikeService} from '../services/bike.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AliceConfig} from '../models/aliceConfig.model';
import {AliceNotification} from '../models/aliceNotification.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-alice',
  templateUrl: './alice.component.html',
  styleUrls: ['./alice.component.css']
})
export class AliceComponent implements OnInit, AfterViewInit {
  constructor(
    private aliceService: AliceService,
    private bikeService: BikeService,
    private fb: FormBuilder
              ) {
    bikeService.getAllBikes().subscribe(
      data => this.bikes = data.map(b => b.name),
      error => {
        console.log(error);
        this.bikes = [];
      }
    );
    this.formGroupConfig = fb.group({
      bike: ['', [Validators.required]],
      track: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
    this.formGroupMessage = fb.group({
      comment: ['', [Validators.required]]
    });
    this.aliceService.getConfig().subscribe(
      data => {
        this.aliceConfig = data;
        this.setConfigValue();
      },
      error => console.log(error)
    );
    this.aliceService.getComments().subscribe(
      data => this.commentsDataSource.data = data,
      error => console.log(error)
    );
    this.aliceService.getNotifications().subscribe(
      data => {
        this.notificationDataSource.data = data.sort((e1, e2) =>
          new Date(e2.timestamp).getTime() - new Date(e1.timestamp).getTime());
        // console.log(this.notificationDataSource.data);
      },
      error => console.log(error)
    );
  }
  breakpoint: number;

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  formGroupConfig: FormGroup;
  formGroupMessage: FormGroup;
  bikes: string[] = [];
  displayedColumns: string[] = ['timestamp', 'message', 'username', 'delete'];
  notificationDisplayedColumns: string[] = ['timestamp', 'message', 'is_public'];
  commentsDataSource = new MatTableDataSource<AliceComment>([]);
  notificationDataSource = new MatTableDataSource<AliceNotification>([]);

  defaultTime = '11:11';
  aliceConfig: AliceConfig;



  ngAfterViewInit(): void {
    this.commentsDataSource.paginator = this.paginator.toArray()[0];
    this.notificationDataSource.paginator = this.paginator.toArray()[1];
  }

  setConfigValue(): void{
    if (this.aliceConfig !== undefined) {
      this.formGroupConfig.controls.bike.setValue(this.aliceConfig.bikeName);
      this.formGroupConfig.controls.track.setValue(this.aliceConfig.trackName);
      this.formGroupConfig.controls.date.setValue(this.aliceConfig.date);
      this.defaultTime = this.aliceConfig.startTime.substr(0, 5);
      this.formGroupConfig.controls.time.setValue(this.defaultTime);
    }
  }

  ngOnInit(): void {
    if (window.innerWidth <= 940) { this.breakpoint = 1; }
    else if (window.innerWidth <= 1300) { this.breakpoint = 2; }
    else if (window.innerWidth <= 1800) { this.breakpoint = 3; }
    else { this.breakpoint = 4; }
  }

  onResize(event): void {
    if (event.target.innerWidth <= 940) { this.breakpoint = 1; }
    else if (event.target.innerWidth <= 1300) { this.breakpoint = 2; }
    else if (event.target.innerWidth <= 1800) { this.breakpoint = 3; }
    else { this.breakpoint = 4; }
  }

  saveConfig(): void {
    console.log(this.formGroupConfig.valid);
    console.log(this.formGroupConfig.controls.date.value);
    if (this.formGroupConfig.valid === true){
      const date: Date = this.formGroupConfig.controls.date.value;
      const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      console.log(dateStr);
      const newConfig = new AliceConfig(
        this.formGroupConfig.controls.bike.value,
        this.formGroupConfig.controls.track.value,
        dateStr,
        `${this.formGroupConfig.controls.time.value}:00`
      );
      this.aliceService.saveConfig(newConfig)
        .subscribe(
          data => {
            // console.log(data);
            this.aliceConfig = newConfig;
          },
          error => console.log(error)
        );
    }

  }

  clearConfig(): void {
    this.formGroupConfig.reset();
    this.setConfigValue();
  }

  saveComment(): void {
    // console.log(this.formGroupMessage.valid);
    // console.log(this.formGroupMessage.controls.comment.value);
    if (this.formGroupMessage.valid === true){
      const newComment = new AliceComment(
        this.formGroupMessage.controls.comment.value,
        undefined,
        undefined,
        undefined
      );
      this.aliceService.addComment(newComment)
        .subscribe(
          data => {
            console.log(data);
            const v = [...this.commentsDataSource.data];
            v.push(data);
            this.commentsDataSource.data =
              v.sort((e1, e2) => new Date(e2.timestamp).getTime() - new Date(e1.timestamp).getTime());
          },
          error => console.log(error)
        );
    }
  }

  deleteElement(element: AliceComment): void{
    this.aliceService.deleteComment(element).subscribe(
      () => this.commentsDataSource.data = this.commentsDataSource.data.filter(e => e.id !== element.id),
      error => console.log(error)
    );
  }

}
