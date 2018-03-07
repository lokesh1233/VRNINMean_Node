import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import { AppComponent }   from '../app.component';
import { FormsModule }    from '@angular/forms';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Component({
  selector: 'app-master',
  templateUrl: './detail.component.html',
  styleUrls: [ './detail.component.css' ]
})

export class DetailComponent implements OnInit {
  constructor(public snackBar: MatSnackBar,private http: Http, private router: Router, private route: ActivatedRoute, public appComponent: AppComponent) {
  }
  
  ngOnInit(){ 
    //this.paramData();
    var that = this;
    this.route.params.subscribe(function(res){
      that.vrnMasterSelData();
    })
  }

  MOPSelectionChange(){
    var valdtn = this.feildValidation;
    this.MOPSelectedField = {};
    var selectedKey = this.vrnMaterData.MODEOFTRANSPORT;
     for(var i in valdtn){
       this.MOPSelectedField[i] = valdtn[i][selectedKey];
     }
  }

  MOPSelectedField = {};
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
   this.http.get('/VRNDetail/'+id)
   .map(res => res.json())
   .subscribe(docs => {
   var vrnMat = that.vrnMaterData;
     if(docs.length>0){
       vrnMat.VEHICLESTATUS = docs[0].VEHICLESTATUS; //that.paramValues['VEHICLESTATUS'+docs[0].VEHICLESTATUS];
       vrnMat.SEALCONDITION = docs[0].SEALCONDITION; //that.paramValues['SEALCONDITION'+docs[0].SEALCONDITION];
       vrnMat.TrnsprtMode = vrnMat.MODEOFTRANSPORT
       vrnMat.REMARKS = docs[0].REMARKS;
       vrnMat.NUMOFBOXES = docs[0].NUMOFBOXES;
       vrnMat.SEALNUM = docs[0].SEALNUM;
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
  //   window.VRNUserDB.collection('VRNHeader').updateOne({VRN:this.VRNId},{ '$set': {VRNSTATUS : "X"}}).then(docs => {
  //     debugger;
      
  //     that.openSnackBar('Succesflly Checked In', '');
  // that.appComponent.loadVRNMasterList();
  //   });
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
    vehNo 	  : { RD: true,  RB: true,  HD: true,  CR: true,  CA: true  },
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

}
