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
import { BusyDialogComponent } from '../busy-dialog/busy-dialog.component';

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
  busyDialog;
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

MOPSelectionChange(){
  var valdtn = this.feildValidation;
  this.MOPSelectedField = {};
  var selectedKey = this.createVRNData.MODEOFTRANSPORT;
  this.defaultUpdationValues(selectedKey);
  for(var i in valdtn){
    this.MOPSelectedField[i] = valdtn[i][selectedKey];
  }
  this.addButtonVal = false;
}


vehicleStatusChange(){
 var vhcleSts =  this.createVRNData.VEHICLESTATUS;
 var visible = true;
 if(vhcleSts == 'E'){
  visible = false;
 }
 this.createVRNData.SEALCONDITION = 'I';
 this.MOPSelectedField.sealCond  = visible;
 this.MOPSelectedField.seal1  = visible;
 this.MOPSelectedField.seal2  = visible;
 this.MOPSelectedField.noOfBoxes  = visible;
 this.createVRNData.NUMOFBOXES = '';
 this.createVRNData.SEAL1 = '';
 this.createVRNData.SEAL2 = '';
}


sealConditionChange(){
 var vhcleSts =  this.createVRNData.SEALCONDITION;
var visible = true;
 if(vhcleSts == 'N'){
  visible = false;
 }
 this.MOPSelectedField.seal1  = visible;
 this.MOPSelectedField.seal2  = visible;
 this.createVRNData.SEAL1 = '';
 this.createVRNData.SEAL2 = '';
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
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  selectedIndex=0;
  TransModes=[];
  ngOnInit() {
  var that = this;
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
transporterChange=true;
driverNm=true;

defaultUpdationValues(dta){
 this.createVRNData = {
  MODEOFTRANSPORT:dta,
  VEHICLENUM:"",
  DRIVERNAME:"",
  DRIVERNUM:"",
  FLEETTYPECODE:"",
  IDPROOFNUM:"",
  IDPROOFTYPE:"",
  LRNUM:"",
  FLEETTYPE:"",
  LRDATE:'',
  LICENSENUM:"",
  VRNSTATUS:"R",
  TRANSPORTER:"",
  TRANSPORTERCODE:"",
  CHECKINOUT:"I",  
  VEHICLESTATUS:dta == "RD"?"L":"",
  SEALCONDITION:dta == "RD"?"I":"",
  REMARKS:"",
  NUMOFBOXES:"",
  SEAL1:"",
  SEAL2:"",  
}
this.transporterChange=true;
this.driverNm=true;
}

IDPROOFCodeTYPE;

licenseSelection(){
  let LcnseNo = this.createVRNData.LICENSENUM;
  if(LcnseNo == ""){
    this.openSnackBar('Enter License Number', '');
     return;
  }

  var licpattern = /[a-zA-Z0-9]/;
  if(!licpattern.test(LcnseNo)){
    this.openSnackBar('Enter Valid License Number', '');
    this.createVRNData.LICENSENUM = "";
     return;
  }
  var that = this;
  this.oData.getLicenseValidation(LcnseNo)
  .subscribe(docs => {
   if(docs.length>0){
        that.createVRNData.DRIVERNAME = docs[0].Lastname;
        that.createVRNData.DRIVERNUM = docs[0].Telephone;
        that.addButtonVal = false;
        that.driverNm=false;
      }else{
        that.createVRNData.DRIVERNAME = ""; 
        that.createVRNData.DRIVERNUM = "";
        that.addButtonVal = true;
        that.driverNm=true;
      }
})
}

vehicleSelection(){
  let vhcle = this.createVRNData.VEHICLENUM.toUpperCase();
  if(vhcle == ""){
    this.openSnackBar('Enter Vehicle Number', '');
     return;
  }

  // var pattern = /^[A-Za-z]{2}([ \-])[0-9]{2}[ ,][A-Za-z0-9]{1,2}[A-Za-z]\1[0-9]{4}$/;
  // if(!pattern.test(vhcle)){
  //   this.openSnackBar('Vehicle Number Invalid','');
  //   this.createVRNData.VEHICLENUM = "";
  //   return;
  // }
  var that = this;
  var MOTType = this.createVRNData.MODEOFTRANSPORT;
  this.oData.getVehicleValidation(vhcle)
.subscribe(docs => {  
  if(!docs[0] || !docs[0].FleetType){
    that.transporterChange = true;
    that.createVRNData.TRANSPORTER = "";
    that.createVRNData.TRANSPORTERCODE = "";
    that.createVRNData.FLEETTYPECODE = MOTType == 'RD'?'M':(MOTType == 'CA' || MOTType == 'CR')?'V':MOTType == 'RB'?'B':'';//docs.length>0?docs[0].FleetType:""; 
    that.createVRNData.FLEETTYPE = MOTType == 'RD'?'Market Vehicle':(MOTType == 'CA' || MOTType == 'CR')?'Vendor Vehicle':MOTType == 'RB'?'Biker':'';  
  }else{
    that.createVRNData.TRANSPORTER = docs[0].VendorName;
    that.createVRNData.TRANSPORTERCODE = docs[0].Vendor;  
    that.createVRNData.FLEETTYPECODE = docs[0].FleetType; 
    that.createVRNData.FLEETTYPE = docs[0].FleetTypeDesc;
    that.transporterChange = false;
  }
})
}

mobilenuvalid(){
  let mobNum = this.createVRNData.DRIVERNUM;
  var mobpattern = /^\d{10}$/;
  if(!mobpattern.test(mobNum)){
    this.openSnackBar('Mobile Number Invalid','');
    this.createVRNData.DRIVERNUM = "";
    return;
  }
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

vrnDta.IDPROOFTYPE = this.IDPROOFCodeTYPE;

if(ind == true){
  vrnDta.VRNSTATUS = "C";
}

this.openBusyDialog();
var that = this;
this.oData.createVRN(vrnDta)
.subscribe(docs => {
  that.busyDialog.close();
  that.openDialog(docs);
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
this.IDPROOFCodeTYPE = data.modeNum;
}

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
  lrNo 		  : { RD: true,  RB: false, HD: false,  CR: true,  CA: true },
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
      if(result != undefined){
      that.createVRNData.DRIVERNUM = result.Telephone;
      that.createVRNData.DRIVERNAME = result.Lastname;
      that.driverNm=false;
      }else{
        that.driverNm=true;
      }
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
