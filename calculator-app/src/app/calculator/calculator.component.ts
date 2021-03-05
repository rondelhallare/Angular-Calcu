import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }
  answered = false; 
  operatorSet = false;
  operand1: number;
  operand2: number;
  subText = '';
  mainText = '';
  operator = '';
  calculationString = '';

  ngOnInit(): void {
  }
  deleteKey($event){
    if($event.key == 'Delete'){
      if (this.mainText !="") {
        this.mainText=this.mainText.substr(0, this.mainText.length-1);
      }
      }
   }
  
   endKey($event){
     if($event.key =='End'){
       this.clear();
        }
     }
  
    keyPress(key: string) {
      if (key === '/' || key === '*' || key === '-' || key === '+') {
         const lastKey = this.mainText[this.mainText.length - 1];
         if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+')  {
           this.operatorSet = true;
         }
         if ((this.operatorSet) || (this.mainText === '')) {
           return;
         }
         this.operand1 = parseFloat(this.mainText);
         this.operand2 = parseFloat(this.mainText);
         this.operator = key;
         this.operatorSet = true;
      }
      if (this.mainText.length === 10) {
        return;
      }
      this.mainText += key;
   }
   
  answer() {
    let formula = this.mainText;
  
    let lastKey = formula[formula.length - 1];
  
    if (lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
  
    lastKey = formula[formula.length - 1];
  
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
    this.subText = this.mainText;
    this.mainText = eval(formula);
  }
  
  
   equals() {
    if(this.mainText != ''){
      this.answer();
  
      var checkLength = `${this.mainText}`;
  
      if(checkLength.length > 10){
        document.getElementById('max').style.color = 'white';
      }
  
      if (this.mainText=="0") this.mainText="";
    }else{
      this.clear();
    }
  
  }
  
   clear(){
     this.mainText = '';
     this.subText = '';
     this.operator = '';
     this.calculationString = '';
     this.answered = false;
     this.operatorSet = false;
     document.getElementById('max').style.color = 'rgba(255, 255, 255, 0.05)';
   }
  
   delete(){
    if (this.mainText !="") {
      this.mainText=this.mainText.substr(0, this.mainText.length-1);
    }
   }
}
