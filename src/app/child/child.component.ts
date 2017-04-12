import {Component, OnInit} from '@angular/core';
import {SpeakersService} from './shared';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  providers: [SpeakersService]
})
export class ChildComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
