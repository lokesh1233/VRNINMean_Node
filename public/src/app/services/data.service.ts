import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http : Http) { }

  getVRNList(){
  	return this.http.get('VRNHeader')
  		.map(vrns => vrns.json())
  	}

  getVRNDetail(id){
	return this.http.get('/VRNDetail/'+id)
	.map(vrns => vrns.json())
	}

  getIDProffList(){
  	return this.http.get('/Params/IDProffList')
  		.map(idProof => idProof.json());
  	}

  getTrnsprtModeList(){
  	return this.http.get('/Params/TrnsprtMode')
	  .map(TrnsprtMode => TrnsprtMode.json());
  	}

  getVendorList(id){
	  return this.http.get('/Transporter')
	  .map(vendor => vendor.json());
  	}

  getLicenseValidation(id){
	  return this.http.get('/License/'+id)
	  .map(license => license.json());
  	}

  getVehicleValidation(id){
	return this.http.get('/Vehicle/'+id)
	.map(vehicle => vehicle.json());
	}

  getLicenseRegionList(){
	return this.http.get('/LicenseRegion')
	.map(vehicle => vehicle.json());
	}

  createLicense(data){
	return this.http.post('/License',data,{
			// headers:new Headers({'Content-Type':'application/json'})
	}).map(res => res.json());
	}

  createVRN(data){
	return this.http.post('/VRNHeader',data,{
			// headers:new Headers({'Content-Type':'application/json'})
		}).map(res => res.json());
	}

	updateVRNCheckIn(id){
		return this.http.put('/VRNHeader/'+id,{},{
				// headers:new Headers({'Content-Type':'application/json'})
			}).map(res => res.json());
		}

	createVRNCheckOut(data){
		return this.http.post('/createVRNCheckOut', data,{
				// headers:new Headers({'Content-Type':'application/json'})
			}).map(res => res.json());
		}

		createtableDataOut(data){
			return this.http.post('/createtableDataOut', data,{
					// headers:new Headers({'Content-Type':'application/json'})
				}).map(res => res.json());
			}
}
