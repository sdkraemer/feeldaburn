import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "adjust-weight-menu",
  templateUrl: "./adjust-weight-menu.component.html",
  styleUrls: ["./adjust-weight-menu.component.scss"]
})
export class AdjustWeightMenuComponent implements OnInit {
  @Input()
  value: string;

  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  increase() {
    this.change.emit("INCREASE");
  }

  decrease() {
    this.change.emit("DECREASE");
  }
}
