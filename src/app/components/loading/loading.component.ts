import { Component, OnInit, Input } from '@angular/core';

/*
  Basic Loading Component, fixed to display at top of screen.

  @Param message -- You can set a custom message.
*/  

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  @Input('message') 
  public message: string = "Loading...";
  
  constructor() { }

  ngOnInit() {
  }

}
