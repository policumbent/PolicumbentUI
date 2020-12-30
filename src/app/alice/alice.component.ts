import { Component, OnInit } from '@angular/core';
import {AliceComment} from '../models/aliceComment.model';

@Component({
  selector: 'app-alice',
  templateUrl: './alice.component.html',
  styleUrls: ['./alice.component.css']
})
export class AliceComponent implements OnInit {
  displayedColumns: string[] = ['timestamp', 'message', 'username', 'delete'];
  dataSource: AliceComment[] = [
    new AliceComment('ciao ciao bla bla ciao bla ijewn', '10:33 22/22/11', 'stefano'),
    new AliceComment('ciao ciao bla bla ciao bla ijewn', '10:22 22/22/11', 'stefano'),
    new AliceComment('ciao ciao bla bla ciao bla ijewn', '10:11 22/22/11', 'pippo')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
