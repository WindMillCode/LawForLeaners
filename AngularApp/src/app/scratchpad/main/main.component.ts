import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
