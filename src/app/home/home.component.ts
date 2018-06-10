import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from "@angular/animations";
import { DataService } from "../data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger("goals", [
      transition("* => *", [
        query(":enter", style({opacity: 0 }), {optional: true}),

        query(":enter", stagger("300ms", [
          animate(".6s ease-in", keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(75%)', offset: 0.3}),
            style({opacity:1, transform: 'translateY(0)', offset: 1.0}),
          ]))
        ]), {optional: true}),

        query(":leave", stagger("300ms", [
          animate(".6s ease-in", keyframes([
            style({opacity: 1, transform: 'translateX(0)', offset: 0}),
            style({opacity: .5, transform: 'translateX(5%)', offset: 0.3}),
            style({opacity:0, transform: 'translateX(10%)', offset: 1.0}),
          ]))
        ]), {optional: true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount: number; // = 4; // interpolation
  btnText: string='Add Goal'; // property binding
  goalText: string="My First Goal for life";
  goals = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.itemCount = this.goals.length;
    this._data.goal.subscribe(res => this.goals = res);
    this._data.changeGoal(this.goals);
  }

  addGoal() {
    this.goals.push(this.goalText);
    this.goalText = "";
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  deleteGoal(iIndex) {
    this.goals.splice(iIndex, 1);
    this._data.changeGoal(this.goals);
  }

}
