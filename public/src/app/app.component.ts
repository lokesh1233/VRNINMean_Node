import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import {MatSnackBar, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DataService } from './services/data.service';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { BusyDialogComponent } from './busy-dialog/busy-dialog.component';

//import { DetailComponent }   from './detail/detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private router: Router,private http: Http,private oData : DataService, private dialog: MatDialog) {}
    searchVisible = false;
    searchVal = "";
    VRNDetlTxt = 'VRN Details';
    busyDialog;
    ngOnInit(){ 
      this.loadVRNMasterList();
     // window.asd = this;
    // this.webhhokURL();
       }

       searchChange(evt){
         this.searchVal = evt.srcElement.value;
         var that = this;
         if(this.searchVal === ""){
          this.createUserData = this.primaryUserData; 
         }
         else{
            this.searchVal = this.searchVal.toLowerCase();
            this.createUserData = this.createUserData.filter(function(ele){
              return (ele.VRN.toString().toLowerCase().indexOf(that.searchVal) > -1 || ele.VEHICLENUM.toLowerCase().indexOf(that.searchVal) > -1);
          });
         }
       }       

  openBusyDialog(): void {
    var that = this;
    this.busyDialog = this.dialog.open(BusyDialogComponent, {
      width: '250px',
      panelClass: 'busyDialog'
    });

    this.busyDialog.afterClosed().subscribe(result => {
      console.log('The busy dialog was closed');
    });
  }

       VRNDetlTxtfn(txt){
         this.VRNDetlTxt = txt;
       }

  loadVRNMasterList(){
    var that = this;

    //node server
    this.openBusyDialog();
    this.http.get('/VRNHeader')
    .map(res => res.json())
    .subscribe(docs => {
      this.busyDialog.close();
    docs = docs.sort(function(a, b){return b.VRN - a.VRN});
      that.primaryUserData=docs;
       that.createUserData=docs;
       that.onVRNSelected({VRN:'A'});
        if(docs.length>0 && window.location.href.indexOf(docs[0].VRN) == -1){
          that.onVRNSelected(docs[0]);
       }else if(docs.length>0){
        setTimeout(function(){
          that.onVRNSelected(docs[0]);
        },100)
       }
    })
  }

  createUserData = []
  primaryUserData = [];
  selectedVRNData = {}

  onVRNSelected(data){
    var dta = this.createUserData;
    for(var i=0;i<dta.length;i++){
      dta[i].class="mat-list-item"
    }
    data.class="mat-list-item selectedIndex";
    this.selectedVRNData = data;
    this.router.navigate(['/detail',data.VRN]);
    this.VRNDetlTxtfn('VRN Check-In: '+data.VRN);
  }  

  getMasterItem(){
    return this.selectedVRNData;
  }

}


