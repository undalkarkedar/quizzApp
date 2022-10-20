import { DataService } from './data.service';
import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets, Chart } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  QnAForm;
  QnA_Array: any;
  isShowChart = false;
  isSubmitted = false;
  answerById = {};
  correctAnswer = [];
  wrongAnswer = [];
  baseChart;
  barChartOptions;
  barChartLabels;
  barChartType;
  barChartPlugins;
  barChartLegend;
  barChartData;
  ChartOptions;
  Label = [];
  ChartType;
  ChartDataSets = [];
  constructor(private _QnAservice: DataService, private fb: FormBuilder) {}
  ngOnInit() {
    this.QnAForm = this.fb.group({});
    this._QnAservice.QnAData().subscribe((val) => {
      this.QnA_Array = val;
      for (const question of this.QnA_Array) {
        const key = question.Id;
        this.QnAForm.addControl(
          key,
          this.fb.control(null, Validators.required)
        );
        this.answerById[key] = question[question.answer];
      }
    });
  }
  Submit() {
    this.isSubmitted = true;
    if (this.QnAForm.invalid) return;
    for (const key in this.QnAForm.controls) {
      const value = this.QnAForm.controls[key].value;
    }
    const controls = Object.keys(this.QnAForm.controls);
    this.correctAnswer = [];
    this.wrongAnswer = [];
    for (const key of controls) {
      const a = this.QnAForm.get(key);

      if (this.answerById[key] == a.value) {
        this.correctAnswer.push(key);
      } else {
        this.wrongAnswer.push(key);
      }
    }

    this.isShowChart = true;
    if (this.isShowChart) {
      this.StatusGraph();
    }
  }
  StatusGraph() {
    this.barChartOptions = this.ChartOptions = {
      responsive: true,
    };
    this.barChartLabels = this.Label = ['Correct Answer', 'Wrong Answer'];
    this.barChartType = this.ChartType = 'bar';
    this.barChartLegend = true;
    this.barChartPlugins = [];

    this.barChartData = this.ChartDataSets = [
      { data: [this.correctAnswer.length], label: 'Correct Answer' },
      { data: [this.wrongAnswer.length], label: 'Wrong Answer' },
    ];
  }
  Clear() {
    this.QnAForm.reset();
    this.isSubmitted = false;
    this.isShowChart = false;
  }
}
