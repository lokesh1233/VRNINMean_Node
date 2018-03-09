import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AppComponent } from '../app.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
   selector: 'app-create-user',
   templateUrl: './create-vrn2.component.html',
   styleUrls: ['./create-vrn2.component.css']
 })
export class CreateVRN2Component {

  agencyCtrl: FormControl;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  filteredAgencies : Observable<any[]>;
  constructor(public snackBar: MatSnackBar,public http: Http,private _formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, public appComponent: AppComponent, public dialog: MatDialog) {
    this.agencyCtrl = new FormControl();
    var that = this;
    this.filteredAgencies = this.agencyCtrl.valueChanges.pipe(
      startWith(''),
      map(agency => that.filterAgencies(agency))
    );
}

MOPSelectedField;
addButtonVal = false;

openDialog(msg): void {
  let dialogRef = this.dialog.open(DialogComponent, {
    width: '250px',
    data: { message: msg }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    //this.animal = result;
  });
}


MOPSelectionChange(){
  var valdtn = this.feildValidation;
  this.MOPSelectedField = {};
  var selectedKey = this.createVRNData.MODEOFTRANSPORT;
  for(var i in valdtn){
    this.MOPSelectedField[i] = valdtn[i][selectedKey];
  }
  this.createVRNDtlData.VEHICLESTATUS = 'L';
  this.createVRNDtlData.SEALCONDITION = 'I';
  if(this.MOPSelectedField.vehStat == false){
    this.createVRNDtlData.VEHICLESTATUS = '';
  }
  
  if(this.MOPSelectedField.sealCond == false){
    this.createVRNDtlData.SEALCONDITION = '';
  }

  this.addButtonVal = false;
}


vehicleStatusChange(){
  debugger;

 var vhcleSts =  this.createVRNDtlData.VEHICLESTATUS;
var visible = true;
 if(vhcleSts == 'E'){
  visible = false;
 }
 this.createVRNDtlData.SEALCONDITION = 'I';
 this.MOPSelectedField.sealCond  = visible;
 this.MOPSelectedField.seal1  = visible;
 this.MOPSelectedField.seal2  = visible;
 this.createVRNDtlData.SEAL1 = '';
 this.createVRNDtlData.SEAL2 = '';
}


sealConditionChange(){
  debugger;

 var vhcleSts =  this.createVRNDtlData.SEALCONDITION;
var visible = true;
 if(vhcleSts == 'N'){
  visible = false;
 }
 this.MOPSelectedField.seal1  = visible;
 this.MOPSelectedField.seal2  = visible;

}

filterAgencies(name: string) {
  debugger;
  var that = this;
  // window.VRNUserDB.collection('Transporter').find({$or:[{'Vendor':name},{'Name1':name }]}).execute().then(docs => {
  //   that.filteredAgencies = docs;
  // })

  if(name == undefined){
    return;
  }
 
  return this.agencies.filter(agency =>
    agency.Name1.toLowerCase().indexOf(name.toLowerCase()) === 0);
}


agencies = [];

  // filterStates(name: string) {
  //   return this.states.filter(state =>
  //     state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  // }
  

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  selectedIndex=0;
  TransModes=[];
  ngOnInit() {
  var that = this;

  // this.firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  //   vhcleNoCtrl: ['', Validators.required],
  //   vhcleStsCtrl: ['', Validators.required],
  //   sealNoCtrl: ['', Validators.required],
  //   sealCnCtrl: ['', Validators.required],
  //   agncyNmeCtrl: ['', Validators.required],
  //   noOfBxCtrl: ['', Validators.required],
  //   seal1Ctrl:['', Validators.required]
  // });
  // this.secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required]
  // });


  // window.VRNUserDB.collection('Params').find({'Domain':'TrnsprtMode'},{'modeNum':1,'modeTxt':1 }).execute().then(docs => {
  //   that.TransModes =  docs;
  // })
  this.agenciesData();

  

  //node server
  this.http.get('/Params/TrnsprtMode')
  .map(res => res.json())
  .subscribe(docs => {
    that.TransModes =  docs;
})

   this.MOPSelectionChange();
  }

agenciesData(){
  var that = this;


//node server
this.http.get('/Transporter')
.map(res => res.json())
.subscribe(docs => {
  that.agencies =  docs;
})
}


 createVRNData = {
  VRN:"",
  MODEOFTRANSPORT:"RD",
  PURPOSE:"",
  SITE:"",
  VEHICLENUM:"",
  DRIVERNAME:"",
  DRIVERNUM:"",
  FLEETTYPECODE:"",
  IDPROOFNUM:"",
  IDPROOFTYPE:"",
  LRNUM:"",
  FLEETTYPE:"",
  LRDATE:new Date(),
  LICENSENUM:"",
  VRNSTATUS:"",
  CHANGEDBY:"Bhaskar",
  CHANGEDON:new Date(),
  CREATEDBY:'Bhaskar',
  CREATEDON:new Date(),
  TRANSPORTER:"",
  TRANSPORTERCODE:""
}


createVRNDtlData = {
  VRN:"",
  CHECKINOUT:"I",  
  VEHICLESTATUS:"L",
  SEALCONDITION:"I",
  REMARKS:"",
  NUMOFBOXES:"",
  SEAL1:"",
  SEAL2:"",
  VEHICLESECURITYTIME: new Date(),
  VEHICLESECURITYDATE: new Date(),
  VEHICLECHECKINDATE: new Date(),
  VEHICLECHECKINTIME: new Date(),
  VRNCHECKINBY: 'Bhaskar'
}

licenseSelection(){
  let LcnseNo = this.createVRNData.LICENSENUM;
  if(LcnseNo == ""){
    this.openSnackBar('Enter License Number', '');
     return;
  }

  var that = this;
  this.http.get('/License/'+LcnseNo)
  .map(res => res.json())
  .subscribe(docs => {
   debugger;
   if(docs.length>0){
        that.createVRNData.DRIVERNAME = docs[0].Lastname;
        that.createVRNData.DRIVERNUM = docs[0].Telephone;
        that.addButtonVal = false;
      }else{
        that.createVRNData.DRIVERNAME = "";
        that.createVRNData.DRIVERNUM = "";
        that.addButtonVal = true;
      }
})

  


  // window.VRNUserDB.collection('License').find({'Licencenumber':Number(LcnseNo)},{'Lastname': 1,'Telephone': 1 }).execute().then(docs => {
  //   if(docs.length>0){
  //     that.createVRNData.DRIVERNAME = docs[0].Lastname;
  //     that.createVRNData.DRIVERNUM = docs[0].Telephone;
  //     that.addButtonVal = false;
  //   }else{
  //     that.createVRNData.DRIVERNAME = "";
  //     that.createVRNData.DRIVERNUM = "";
  //     that.addButtonVal = true;
  //   }
  // })
  
}

vehicleSelection(){
  let vhcle = this.createVRNData.VEHICLENUM;
  if(vhcle == ""){
    this.openSnackBar('Enter Vehicle Number', '');
     return;
  }

  var that = this;

  this.http.get('/Vehicle/'+vhcle,{})
.map(res => res.json())
.subscribe(docs => {
  debugger;
  that.createVRNData.TRANSPORTER = docs.length>0?docs[0].Vendor:"";
  that.createVRNData.TRANSPORTERCODE = docs.length>0?docs[0].Vendor:"";
  that.createVRNData.FLEETTYPECODE = 'M';//docs.length>0?docs[0].FleetType:""; 
  that.createVRNData.FLEETTYPE = 'Market Vehicle';
  //that.openSnackBar('Succesflly placed new Vehicle', '');
  //that.appComponent.loadVRNMasterList();
 // that.TransModes =  docs;
})

  // window.VRNUserDB.collection('Vehicle').find({'VehicleNumber':vhcle},{'Vendor': 1 }).execute().then(docs => {
  //   that.createVRNData.TRANSPORTER = docs.length>0?docs[0].Vendor:"";
  //   that.createVRNData.TRANSPORTERCODE = docs.length>0?docs[0].Vendor:"";
  // })
  
}

switchHstl(evt){
  //this.createUserData.typeOfHstl=evt.value;
}

onSubmit(){
 
debugger;

this.createVRNData.PURPOSE = '';//this.selectedIndex == 0 ? "Inbound" : "Outbound"; 
var that = this;

this.http.post('/VRNHeader',{headerData:this.createVRNData,detailData:this.createVRNDtlData})
.map(res => res.json())
.subscribe(docs => {
  debugger;
  that.openDialog(docs);
  //that.openSnackBar('Succesflly placed VRN', '');
   that.appComponent.loadVRNMasterList();
 // that.TransModes =  docs;
})



//var cnt = window.VRNUserDB.collection('VRNHeader').count();
// setTimeout(function(){
//   debugger;
//that.createVRNData.VRN = (100000900 + cnt.__zone_symbol__value).toString(); 

//that.createVRNDtlData.VRN = that.createVRNData.VRN;
//  window.VRNUserDB.collection('VRNHeader').insertOne(that.createVRNData).then(function(){
//   that.openSnackBar('Succesflly placed VRN', '');
//   that.appComponent.loadVRNMasterList();
//   window.VRNUserDB.collection('VRNDetail').insertOne(that.createVRNDtlData).then(function(){
//     debugger;
//    });  
//   debugger;
// });  

//},1500)
}

VRNCheckIn(){
  this.createVRNData.VRNSTATUS = "X";
  this.onSubmit();
}

  // window.HostelUserDB.collection('UserList').insertOne(dta).then(function(){
  //   that.openSnackBar('Succesflly user '+ dta.fullName + ' created', '');
  //   that.fileUpload(fileString, id, MIMEType);
  //   that.router.navigate(['/master']);
  //   });   

  navigateBefore(evt){
   this.router.navigate(['/master']);
  }
licenseRegionData = [];
// createNewLicense = {
//   Licencenumber : this.createVRNData.LICENSENUM,
//   Lastname : '',
//   Validto : '',
//   MobileNum : '',
//   ReasonCode : ''

// }



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

  createLicenseDta(): void{
    var that = this;
    // window.VRNUserDB.collection('LicenseRegion').find({}).execute().then(docs => {
    //   that.licenseRegionData =  docs;
    // })

    if(that.createVRNData.LICENSENUM == ''){
      that.openSnackBar('Enter license number', '');
      return;
    }

    let dialogRef = this.dialog.open(CreateLicenseDialog, {
      width: '500px',
      data: { Licencenumber: that.createVRNData.LICENSENUM ,licenseRegionData: that.licenseRegionData }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      console.log('The dialog was closed');
      that.createVRNData.DRIVERNUM = result.Telephone;
      that.createVRNData.DRIVERNAME = result.Lastname;
    //  this.animal = result;
    });
  }

}

@Component({
  selector: 'create-License-Dialog',  
  templateUrl: './create-License-Dialog.html',
  styleUrls: ['./create-vrn2.component.css']
})
export class CreateLicenseDialog {

  constructor(
    public dialogRef: MatDialogRef<CreateLicenseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar,public http: Http,public createVRNComponent: CreateVRN2Component) { }



    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  licenseRegionData=[];
   createNewLicense = {
    Licencenumber:this.data.Licencenumber,
     Lastname : '',
     Validto : '',
     Telephone  : '',
     Rg  : ''
   }
  ngOnInit() {
  var that = this;
  this.http.get('/LicenseRegion')
  .map(res => res.json())
  .subscribe(docs => {
    that.licenseRegionData =  docs;
})
  // window.VRNUserDB.collection('LicenseRegion').find({}).execute().then(docs => {
  //   that.licenseRegionData =  docs;
  // })
}

onSubmit() {
  var that = this;
  var dta = this.createNewLicense;

  if(dta.Lastname == '' || dta.Rg == ''|| dta.Telephone == '' || dta.Validto == '' ){
    that.openSnackBar('Enter required fields', '');
    return;
  }



  this.http.post('/License',this.createNewLicense)
  .map(res => res.json())
  .subscribe(docs => {
   debugger;
   that.openSnackBar('Succesflly created license '+ that.createNewLicense.Licencenumber, '');
   //    // that.createVRNComponent.createVRNData.DRIVERNUM = dta.Telephone;
   //    // that.createVRNComponent.createVRNData.DRIVERNAME = dta.Lastname;
        that.dialogRef.close(dta);
})
  // window.VRNUserDB.collection('License').insertOne(this.createNewLicense).then(docs => {
  //   debugger;
  //     that.openSnackBar('Succesflly created license', '');
  //    // that.createVRNComponent.createVRNData.DRIVERNUM = dta.Telephone;
  //    // that.createVRNComponent.createVRNData.DRIVERNAME = dta.Lastname;
  //     that.dialogRef.close(dta);
  // })
}

onClose() {
  this.dialogRef.close();
}
}


