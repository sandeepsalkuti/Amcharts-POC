import { Component } from '@angular/core';
import *as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amcharts-poc';
  unfundedTotal=0;
  terminationTotal=0;
  retailindividual=0;
  reatiljoint=0;
  ira=0;
  currentMonthAccounts=0;
  previousMonthsAccounts=0;
  private value;
  convertedJSON !: string;
  passingData:any;
  passingDataOne:any;
  passingDataTwo: any;
  options = { month: 'long'};

  fetchData(event:any){

    const filedata= event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(filedata);
    fileReader.onload = (event:any) => {
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData,{type:'binary',cellDates: true });
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]],{defval: 0});
      const formattedData = data.map((el:any) => {
        return {...el, dateMonth:new Intl.DateTimeFormat('en-US', {month: "short"}).format(new Date(el.Date))}
      })
      console.log(formattedData);
      this.finddate(formattedData);
      this.findsum(formattedData);
      this.findsumone(formattedData);
      this.convertedJSON = JSON.stringify(formattedData,undefined,4);
      console.log((this.convertedJSON));
    }
  }
  finddate(data){
    this.value=data
    const lastRow = Object.keys(data).length;
    console.log("row num:", lastRow);
    let currdate = new Date(data[lastRow-1]['Date']).toLocaleDateString();
    let prevdate = new Date(data[lastRow-1]['Date']);
    prevdate.setMonth(prevdate.getMonth( ) -6);
    prevdate.toLocaleDateString();

    const prevEndMonth = new Date(currdate);
    prevEndMonth.setDate(1);

    const lastEndMonth = new Date(prevdate);
    lastEndMonth.setDate(0);

    console.log("prevEnd ", prevEndMonth);
    console.log("lastEnd ", lastEndMonth);

    for(let j=0;j<data.length;j++){
      const dateCheck1 = this.value[j]['Date'].toLocaleDateString();
      const dateCheck = new Date(dateCheck1);
      dateCheck.setDate(1);

      if(dateCheck.getMonth() === prevEndMonth.getMonth() && dateCheck.getFullYear() === prevEndMonth.getFullYear()){
        this.currentMonthAccounts += this.value[j]["Accounts"];
      }
      if (dateCheck.getTime() < prevEndMonth.getTime() && dateCheck.getTime() > lastEndMonth.getTime())
      {
        this.previousMonthsAccounts += this.value[j]["Accounts"];
      }
    }
    console.log("currentmonthsum: ", this.currentMonthAccounts);
    console.log("previousmonthssum: ", this.previousMonthsAccounts);
    this.passingDataTwo = [
      this.currentMonthAccounts,
      this.previousMonthsAccounts,
    ]
  }
  findsumone(data){
    this.value=data
    for(let j=0;j<data.length;j++){
         this.retailindividual+= this.value[j]["Retail Individual"];
         this.reatiljoint += this.value[j]["Retail Joint"];
         this.ira += this.value[j]["IRA"];
    }
    this.passingDataOne = [
      this.retailindividual,
      this.reatiljoint,
      this.ira
    ]


}
findsum(data){
  this.value=data
  for(let j=0;j<data.length;j++){
       this.unfundedTotal+= this.value[j]["Unfunded Acs"];
       this.terminationTotal += this.value[j]["Termination Acs"];
  }
  this.passingData = [
    this.unfundedTotal,
    this.terminationTotal
  ]
  console.log("passingData:", this.passingData);
  console.log("unfunded total:", this.unfundedTotal);
  console.log("termination total:", this.terminationTotal);

}

}
