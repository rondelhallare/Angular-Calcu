import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  input: string = '';
  result: string = '';
  keyboardInput: string = '';
  keyboardInputNum = /[0-9]/;

  onKey(event: any) {
    this.keyboardInput = event.key;
    if (this.keyboardInputNum.test(this.keyboardInput)) {
      this.NumPress(event.key);
      console.log(event)
    }

  }

  NumPress(num: string) {

  
    if (num == ".") {
      if (this.input != "") {

        const lastNum = this.getLastOperand()
        console.log(lastNum.lastIndexOf("."))
        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }

    
    if (num == "0") {
      if (this.input == "") {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+') {
        return;
      }
    }

    this.input = this.input + num
    this.Result();
  }

  getLastOperand() {
    let pos: number;
    console.log(this.input)
    pos = this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos = this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos = this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos = this.input.lastIndexOf("/")
    console.log('Last ' + this.input.substr(pos + 1))
    return this.input.substr(pos + 1)
  }

  Operator(op: string) {

    
    const lastInput = this.input[this.input.length - 1];
    if (lastInput === '/' || lastInput === '*' || lastInput === '-' || lastInput === '+') {
      return;
    }

    this.input = this.input + op
    this.Result();
  }

  clear() {
    if (this.input != "") {
      this.input = this.input.substr(0, this.input.length - 1)
    }
  }

  allClear() {
    this.result = '';
    this.input = '';
  }

  Result() {
    let equation = this.input;

    let lastInput = equation[equation.length - 1];

    if (lastInput === '.') {
      equation = equation.substr(0, equation.length - 1);
    }

    lastInput = equation[equation.length - 1];

    if (lastInput === '/' || lastInput === '*' || lastInput === '-' || lastInput === '+' || lastInput === '.') {
      equation = equation.substr(0, equation.length - 1);
    }

    console.log("Formula " + equation);
    this.result = eval(equation);
  }

  equals() {
    this.Result();
    this.input = this.result;
    if (this.input == "0") this.input = "";
  }
}
