import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../services/data.service';
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
  IDProofCtrl: FormControl;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  filteredAgencies : Observable<any[]>;
  filteredProofs: Observable<any[]>;
  inTime= new Date();
  constructor(public snackBar: MatSnackBar,private oData : DataService,public http: Http,private _formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, public appComponent: AppComponent, public dialog: MatDialog) {
    this.agencyCtrl = new FormControl();
    this.IDProofCtrl = new FormControl();
    var that = this;
    this.filteredAgencies = this.agencyCtrl.valueChanges.pipe(
      startWith(''),
      map(agency => that.filterAgencies(agency))
    );
    this.filteredProofs = this.IDProofCtrl.valueChanges.pipe(
      startWith(''),
      map(proof => that.filterProofs(proof))
    );
}

MOPSelectedField;
addButtonVal = false;
idProofData = [];

idProofParamData(){
  var that = this;
  //node server
  this.oData.getIDProffList()
  .subscribe(docs => {
    that.idProofData =  docs;
})
}

openDialog(msg): void {
  var that = this;
  let dialogRef = this.dialog.open(DialogComponent, {
    width: '250px',
    data: msg 
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    that.appComponent.loadVRNMasterList();
    //this.animal = result;
  });
}


MOPSelectionChange(){
  var valdtn = this.feildValidation;
  this.MOPSelectedField = {};
  var selectedKey = this.createVRNData.MODEOFTRANSPORT;
  this.defaultUpdationValues(selectedKey);
  for(var i in valdtn){
    this.MOPSelectedField[i] = valdtn[i][selectedKey];
  }
 // this.createVRNDtlData.VEHICLESTATUS = 'L';
 // this.createVRNDtlData.SEALCONDITION = 'I';
 // if(this.MOPSelectedField.vehStat == false){
 //   this.createVRNDtlData.VEHICLESTATUS = '';
 // } 
  // if(this.MOPSelectedField.sealCond == false){
  //   this.createVRNDtlData.SEALCONDITION = '';
  // }

  this.addButtonVal = false;
}


vehicleStatusChange(){
  

 var vhcleSts =  this.createVRNDtlData.VEHICLESTATUS;
var visible = true;
 if(vhcleSts == 'E'){
  visible = false;
 }
 this.createVRNDtlData.SEALCONDITION = 'I';
 this.MOPSelectedField.sealCond  = visible;
 this.MOPSelectedField.seal1  = visible;
 this.MOPSelectedField.seal2  = visible;
 this.MOPSelectedField.noOfBoxes  = visible;
 this.createVRNDtlData.NUMOFBOXES = '';
 this.createVRNDtlData.SEAL1 = '';
 this.createVRNDtlData.SEAL2 = '';
}


sealConditionChange(){
  

 var vhcleSts =  this.createVRNDtlData.SEALCONDITION;
var visible = true;
 if(vhcleSts == 'N'){
  visible = false;
 }
 this.MOPSelectedField.seal1  = visible;
 this.MOPSelectedField.seal2  = visible;
 this.createVRNDtlData.SEAL1 = '';
 this.createVRNDtlData.SEAL2 = '';



}

filterAgencies(name: string) {
  
  var that = this;
  if(name == undefined){
    return;
  }
  return this.agencies.filter(agency =>
    agency.Name1.toLowerCase().indexOf(name.toLowerCase()) === 0);
}

filterProofs(name: string) {
  
  var that = this;
  if(name == undefined){
    return;
  }
  return this.idProofData.filter(proof =>
    proof.modeTxt.toLowerCase().indexOf(name.toLowerCase()) === 0);
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
  this.defaultUpdationValues('RD');
  this.agenciesData();
  this.idProofParamData();
  

  //node server
this.oData.getTrnsprtModeList()
.subscribe(docs => {
  that.TransModes =  docs;
})
   this.MOPSelectionChange();
  }

agenciesData(){
  var that = this;
  //node server
  this.oData.getVendorList('')
  .subscribe(docs => {
  that.agencies =  docs;
})
}

createVRNData;
createVRNDtlData;
defaultUpdationValues(dta){
 this.createVRNData = {
  VRN:"",
  MODEOFTRANSPORT:dta,
  PURPOSE:"",
  SITE:"",
  VEHICLENUM:"",
  DRIVERNAME:"",
  DRIVERNUM:"",
  FLEETTYPECODE:"",
  IDPROOFNUM:"",
  IDPROOFTYPE:"",
  IDPROOFCodeTYPE:"",
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


this.createVRNDtlData = {
  VRN:"",
  CHECKINOUT:"I",  
  VEHICLESTATUS:dta == "RD"?"L":"",
  SEALCONDITION:dta == "RD"?"I":"",
  REMARKS:"",
  NUMOFBOXES:"",
  SEAL1:"",
  SEAL2:"",
  VEHICLESECURITYTIME: new Date(),
  VEHICLESECURITYDATE: new Date(),
  VEHICLECHECKINDATE:'',
  VEHICLECHECKINTIME: '',
  VRNCHECKINBY: 'Bhaskar'
}
}

licenseSelection(){
  let LcnseNo = this.createVRNData.LICENSENUM;
  if(LcnseNo == ""){
    this.openSnackBar('Enter License Number', '');
     return;
  }
  var that = this;
  this.oData.getLicenseValidation(LcnseNo)
  .subscribe(docs => {
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
}


vehicleSelection(){
  let vhcle = this.createVRNData.VEHICLENUM;
  if(vhcle == ""){
    this.openSnackBar('Enter Vehicle Number', '');
     return;
  }

  var that = this;
  var MOTType = this.createVRNData.MODEOFTRANSPORT;
  this.oData.getVehicleValidation(vhcle)
.subscribe(docs => {
  
  that.createVRNData.TRANSPORTER = docs.length>0?docs[0].VendorName:"";
  that.createVRNData.TRANSPORTERCODE = docs.length>0?docs[0].Vendor:"";  
  if(!docs[0] || !docs[0].FleetType){
    that.createVRNData.FLEETTYPECODE = MOTType == 'RD'?'M':(MOTType == 'CA' || MOTType == 'CR')?'V':MOTType == 'RB'?'B':'';//docs.length>0?docs[0].FleetType:""; 
    that.createVRNData.FLEETTYPE = MOTType == 'RD'?'Market Vehicle':(MOTType == 'CA' || MOTType == 'CR')?'Vendor Vehicle':MOTType == 'RB'?'Biker':'';  
  }else{
    that.createVRNData.FLEETTYPECODE = docs[0].FleetType; 
    that.createVRNData.FLEETTYPE = docs[0].FleetTypeDesc;
  }
})

}

switchHstl(evt){
  //this.createUserData.typeOfHstl=evt.value;
}

onSubmit(ind){
 
  var mandtry = this.mandatoryFields;
  var fldValdtn = this.feildValidation;
  var vrnDta = this.createVRNData;
for(var i in mandtry){
  if(fldValdtn[i][vrnDta.MODEOFTRANSPORT] && vrnDta[mandtry[i]['id']] == ''){
    this.openSnackBar(mandtry[i]['msg'], '');
    return;
  }
}

  this.createVRNData.PURPOSE = '';
  var that = this;

if(ind == true){
  this.createVRNData.VRNSTATUS = "X";
  this.createVRNDtlData.VEHICLECHECKINDATE= new Date();
  this.createVRNDtlData.VEHICLECHECKINTIME= new Date();
}

this.oData.createVRN({headerData:this.createVRNData,detailData:this.createVRNDtlData})
.subscribe(docs => {
  that.openDialog(docs);
  //that.openSnackBar('Succesflly placed VRN', '');
  //  that.appComponent.loadVRNMasterList();
 // that.TransModes =  docs;
})
}

selectTransporterChange(data){
this.createVRNData.TRANSPORTER = data.Name1;
this.createVRNData.TRANSPORTERCODE = data.Vendor;
}

VRNCheckIn(){
  this.onSubmit(true);
}

selectIDProofChange(data){
//debugger;
this.createVRNData.IDPROOFCodeTYPE = data.modeNum;
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
  idProof 	: { RD: false, RB: false, HD: true,   CR: false, CA: false },
  idProofNum 	: { RD: false, RB: false, HD: true,   CR: false, CA: false }
};


mandatoryFields={
  vehNo 	  : {msg:'Enter vehicle number', id:'VEHICLENUM'},
  transName : {msg:'Select transporter name', id:'TRANSPORTERCODE'},
  licNo 	  : {msg:'Enter license number', id:'LICENSENUM'},
  mobNo 	  : {msg:'Enter mobile number', id:'DRIVERNUM'},
  personName: {msg:'Enter driver name', id:'DRIVERNAME'},
  idProof 	: {msg:'Select id proof', id:'IDPROOFTYPE'},
  idProofNum 	: {msg:'Enter id proof number', id:'IDPROOFNUM'}
};



  createLicenseDta(): void{
    var that = this;
    if(that.createVRNData.LICENSENUM == ''){
      that.openSnackBar('Enter license number', '');
      return;
    }

    let dialogRef = this.dialog.open(CreateLicenseDialog, {
      width: '500px',
      data: { Licencenumber: that.createVRNData.LICENSENUM ,licenseRegionData: that.licenseRegionData }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      that.createVRNData.DRIVERNUM = result.Telephone;
      that.createVRNData.DRIVERNAME = result.Lastname;
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
    @Inject(MAT_DIALOG_DATA) public data: any,private oData : DataService, public snackBar: MatSnackBar,public http: Http,public createVRNComponent: CreateVRN2Component) { }



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
  this.oData.getLicenseRegionList()
  .subscribe(docs => {
    that.licenseRegionData =  docs;
})
}

onSubmit() {
  var that = this;
  var dta = this.createNewLicense;
  if(dta.Lastname == '' || dta.Rg == ''|| dta.Telephone == '' || dta.Validto == '' ){
    that.openSnackBar('Enter required fields', '');
    return;
  }

  this.oData.createLicense(this.createNewLicense)
  .subscribe(docs => {
   that.openSnackBar('Succesflly created license '+ that.createNewLicense.Licencenumber, '');
        that.dialogRef.close(dta);
})
}

onClose() {
  this.dialogRef.close();
}
}


