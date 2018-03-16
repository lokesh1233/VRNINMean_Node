import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatDialog, MatTableDataSource} from '@angular/material';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import { AppComponent }   from '../app.component';
import { FormsModule }    from '@angular/forms';
import { DataService } from '../services/data.service';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { DialogComponent } from '../dialog/dialog.component';
import { BusyDialogComponent } from '../busy-dialog/busy-dialog.component';

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.component.html',
  styleUrls: ['./new-detail.component.css']
})
export class NewDetailComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,private http: Http, private router: Router, private route: ActivatedRoute, public appComponent: AppComponent, public dialog: MatDialog, private oData : DataService) { }

  ngOnInit() {
    var that = this;
    this.route.params.subscribe(function(res){
      that.vrnMasterSelData();
    })
  }

  busyDialog;
  MOPSelectedField;
  checkoutField;
  CheckOutpostdata;
  VRNId = '';
  roadTransport='';
  paramValues={};
  vrnMaterData;
  selectedIndex = null;
  selectedUser = null;
  readUserItemData = 0;
  createUserData = [];
  createItemData = [];
  ELEMENT_DATA  = [];
  displayedColumns = ['user', 'Item', 'Amount'];
  userIds = [];
  itemIds = []; 
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

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

  vrnMasterSelData(){
    let id = this.route.snapshot.paramMap.get('id');
   // this.vrnMaterData = {};
    this.VRNId = id;
    if(id != 'A'){
      this.vrnMaterData = this.appComponent.getMasterItem();
      this.roadTransport = this.vrnMaterData.MODEOFTRANSPORT;
    //  this.vrnMaterData.MODEOFTRANSPORT = '';
    //   this.vrnMaterData.VEHICLESTATUS = '';
    //   this.vrnMaterData.SEALCONDITION = '';
    //   this.vrnMaterData.REMARKS = '';
    //   this.vrnMaterData.NUMOFBOXES = '';
    //   this.vrnMaterData.SEALNUM = '';
    }
    this.loadVRNDetail(id);
    this.MOPSelectionChange();
    this.CheckOutpostdata={
      VEHICLESTATUS : "",
      NUMOFBOXES : "",
      SEALCONDITION : "",
      REMARKS : "",
      VRN:this.vrnMaterData.VRN
 };
    this.checkoutSelectionChange();

  }

  checkoutSelectionChange(){
    var valdtn = this.checkout;
    this.checkoutField = {}; 
     var selectedKey = this.vrnMaterData.MODEOFTRANSPORT;
      for(var i in valdtn){
        this.checkoutField[i] = valdtn[i][selectedKey];
      }
  }
  vehicleStaChange(){
      var veclStus =  this.CheckOutpostdata.vehcleStatus;
      var visible = true;
      if(veclStus == 'E'){
        visible = false;
       }
       this.MOPSelectedField.sealCond = visible;
       this.MOPSelectedField.noOfBoxes  = visible;
  }

  MOPSelectionChange(){
    var valdtn = this.feildValidation;
    this.MOPSelectedField = {}; 
     var selectedKey = this.vrnMaterData.MODEOFTRANSPORT;
      for(var i in valdtn){
        this.MOPSelectedField[i] = valdtn[i][selectedKey];
      }
  }

  loadVRNDetail(id){
    var that = this;
    
    // window.VRNUserDB.collection('VRNDetail').find({VRN:id}).execute().then(docs => {
    //   var vrnMat = that.vrnMaterData;
    //   if(docs.length>0){
    //     vrnMat.VEHICLESTATUS = that.paramValues['VEHICLESTATUS'+docs[0].VEHICLESTATUS];
    //     vrnMat.SEALCONDITION = that.paramValues['SEALCONDITION'+docs[0].SEALCONDITION];
    //     vrnMat.TrnsprtMode = that.paramValues['TrnsprtMode'+that.roadTransport ];
    //     vrnMat.REMARKS = docs[0].REMARKS;
    //     vrnMat.NUMOFBOXES = docs[0].NUMOFBOXES;
    //     vrnMat.SEALNUM = docs[0].SEALNUM;
    //   }
    // });


   //node server

   this.oData.getVRNDetail(id)
   .subscribe(docs => {
   var vrnMat = that.vrnMaterData;
   
   if(docs.length>0){
       vrnMat.VEHICLESTATUS = docs[0].VEHICLESTATUS; //that.paramValues['VEHICLESTATUS'+docs[0].VEHICLESTATUS];
       vrnMat.SEALCONDITION = docs[0].SEALCONDITION; //that.paramValues['SEALCONDITION'+docs[0].SEALCONDITION];
       //vrnMat.TrnsprtMode = vrnMat.MODEOFTRANSPORT
       vrnMat.REMARKS = docs[0].REMARKS;
       vrnMat.NUMOFBOXES = docs[0].NUMOFBOXES;
       vrnMat.SEAL1 = docs[0].SEAL1;
       vrnMat.SEAL2 = docs[0].SEAL2;
     }
 })



     // window.VRNUserDB.collection('VRNDetail').find({VRN:id}).execute().then(docs => {
    //   var vrnMat = that.vrnMaterData;
    //   if(docs.length>0){
    //     vrnMat.VEHICLESTATUS = that.paramValues['VEHICLESTATUS'+docs[0].VEHICLESTATUS];
    //     vrnMat.SEALCONDITION = that.paramValues['SEALCONDITION'+docs[0].SEALCONDITION];
    //     vrnMat.TrnsprtMode = that.paramValues['TrnsprtMode'+that.roadTransport ];
    //     vrnMat.REMARKS = docs[0].REMARKS;
    //     vrnMat.NUMOFBOXES = docs[0].NUMOFBOXES;
    //     vrnMat.SEALNUM = docs[0].SEALNUM;
    //   }
    // });
  }

  paramData(){
    var that = this;  
  //   window.VRNUserDB.collection('Params').find( {
  //     $or : [{
  //       Domain:'SEALCONDITION'
  //       }, {
  //       Domain: 'VEHICLESTATUS'
  //       }, { 
  //       Domain: 'TrnsprtMode'
  //     }]}).execute().then(docs => {
  //       var dat = {};
  //       for(var i=0;i<docs.length;i++){
  //         dat[docs[i]['Domain']+docs[i]['modeNum']] = docs[i]['modeTxt'];
  //       }
  //      that.paramValues = dat;
  //  })
  }

  VRNCheckIn(){
var that = this;
this.openBusyDialog();
  
this.oData.updateVRNCheckIn(this.vrnMaterData.VRN)
   .subscribe(docs => {
    that.openDialog(docs);
    that.busyDialog.close();
    //that.openSnackBar(docs.message, '');
   //  that.appComponent.loadVRNMasterList();
     })

  //   window.VRNUserDB.collection('VRNHeader').updateOne({VRN:this.VRNId},{ '$set': {VRNSTATUS : "X"}}).then(docs => {
  //     debugger;
      
  //     that.openSnackBar('Succesflly Checked In', '');
  // that.appComponent.loadVRNMasterList();
  //   });
  }

  VRNCheckOut(){
    var that = this;

    var dat = this.CheckOutpostdata
      if(dat.VEHICLESTATUS == '' && this.checkoutField.vehStat){
        that.openSnackBar('Select vehicle status loaded or empty', '');
        return;
      }
      this.openBusyDialog();
  
this.oData.createVRNCheckOut(dat)
   .subscribe(docs => {
    that.openDialog(docs);
    that.busyDialog.close();
  })
  }
  

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  feildValidation={
    vehStat 	: { RD: true,  RB: false, HD: false,  CR: false, CA: false },
    vehNo 	  : { RD: true,  RB: true,  HD: false,  CR: true,  CA: true  },
    fleetType : { RD: true,  RB: true,  HD: false,  CR: true,  CA: true  },
    transName : { RD: true,  RB: true,  HD: false,  CR: true,  CA: true  },
    sealCond 	: { RD: true,  RB: false, HD: false,  CR: false, CA: false },
    seal1 	  : { RD: true,  RB: false, HD: false,  CR: false, CA: false },
    seal2 	  : { RD: true,  RB: false, HD: false,  CR: false, CA: false },
    licNo 	  : { RD: true,  RB: true,  HD: false,  CR: true,  CA: true  },
    mobNo 	  : { RD: true,  RB: true,  HD: true,   CR: true,  CA: true  },
    personName: { RD: true,  RB: true,  HD: true,   CR: true,  CA: true  },
    noOfBoxes : { RD: true,  RB: false, HD: false,  CR: false, CA: false },
    lrNo 		  : { RD: true,  RB: false, HD: false,  CR: true,  CA: false },
    idProof 	: { RD: false, RB: false, HD: true,   CR: false, CA: false }
  };

  checkout={
    vehStat 	: { RD: true,  RB: true, HD: false,  CR: true, CA: true },  
    sealCond 	: { RD: true,  RB: false, HD: false,  CR: false, CA: false },
    noOfBoxes : { RD: true,  RB: true, HD: true,  CR: true, CA: true },
    podremarks : { RD: true,  RB: true,  HD: true,  CR: true,  CA: true },
  };


  openDialog(msg): void {
    var that = this;
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: msg 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      that.appComponent.loadVRNMasterList();
      //this.animal = result;
    });

}}
