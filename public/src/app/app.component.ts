import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
//import { DetailComponent }   from './detail/detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private router: Router,private http: Http) {}
    
    ngOnInit(){ 
      this.loadVRNMasterList();
     // window.asd = this;
    // this.webhhokURL();
       }

  loadVRNMasterList(){
    var that = this;
<<<<<<< HEAD

    //node server
=======
 
    //node server ad
>>>>>>> 21866e1e8ac5d7bde95b10f57e60d20919318f5d
    this.http.get('/VRNHeader')
    .map(res => res.json())
    .subscribe(docs => {
    debugger; 
    docs = docs.sort(function(a, b){return b.VRN - a.VRN});
       that.createUserData=docs;
      if(docs.length>0){
         that.onVRNSelected(docs[0]);
       }else{
         that.onVRNSelected({VRN:'0'});
       }
    })

    

    // window.VRNUserDB.collection('VRNHeader').find({VRNSTATUS:''}).execute().then(docs => {
    //  docs = docs.sort(function(a, b){return b.VRN - a.VRN});
    //   that.createUserData=docs;
    //   if(docs.length>0){
    //     that.onVRNSelected(docs[0]);
    //   }else{
    //     that.onVRNSelected({VRN:'0'});
    //   }
    // });

  }

  createUserData = []
  selectedVRNData = {}

  onVRNSelected(data){
    var dta = this.createUserData;
    for(var i=0;i<dta.length;i++){
      dta[i].class="mat-list-item"
    }
    data.class="mat-list-item selectedIndex";
    this.selectedVRNData = data;
    this.router.navigate(['/detail',data.VRN]);
  }  

  getMasterItem(){
    return this.selectedVRNData;
  }


//   webhhokURL(){
//     debugger;
//     var xhttp = new XMLHttpRequest();
//  xhttp.onreadystatechange = function() { debugger;
//    if (this.readyState == 4 && this.status == 200) {
//    // Typical action to be performed when the document is ready:
//    document.getElementById("demo").innerHTML = xhttp.responseText;
//  }
// };
// xhttp.open("GET", "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/vrn_apps-iejcy/service/VRNCreate/incoming_webhook/VRNCreateWebHook", true);

// xhttp.setRequestHeader('signature','test');
// xhttp.setRequestHeader('Accept','application/json');
// xhttp.setRequestHeader('Access-Control-Allow-Origin','*');
// xhttp.setRequestHeader('X-Hook-Signature','test');
// xhttp.send();
//   }

}


