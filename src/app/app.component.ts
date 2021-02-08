import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxDropDownList';
import { jqxDateTimeInputComponent } from 'jqwidgets-ng/jqxDateTimeInput';

import { ClaimService } from './claim.service';
import { IClaim } from './claim.interface';
import { IServiceType } from './claim.interface';
import { IClaimStatus } from './claim.interface';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myGrid') myGrid?: jqxGridComponent;
  @ViewChild('myWindow') myWindow?: jqxWindowComponent;
  @ViewChild('serviceType') serviceType?: jqxDropDownListComponent;
  @ViewChild('serviceDate') serviceDate?: jqxDateTimeInputComponent;
  @ViewChild('patientNHI') patientNHI?: jqxInputComponent;
  @ViewChild('claimAmount') claimAmount?: jqxInputComponent;
  @ViewChild('claimStatus') claimStatus?: jqxDropDownListComponent;

  _rowIndex: number = -1;
  
  constructor(private claimService: ClaimService) { }
  
  ngAfterViewInit() {
    this.myGrid?.showloadelement();
    this.grid_getData();  
  }

  grid_source = {
    localdata: new Array<IClaim>(),
    datafields: [
      { name: 'claimId', type: 'string' },
      { name: 'DOS', type: 'string' },
      { name: 'serviceTypeID', type: 'string' },
      { name: 'NHI', type: 'string' },
      { name: 'amountExclGST', type: 'string' },
      { name: 'claimStatusID', type: 'string' },
      { name: 'summary', type: 'string' },
    ],
    datatype: 'json',
  };
  grid_dataAdapter = new jqx.dataAdapter(this.grid_source);
  grid_columns = [
    { text: 'ClaimID', datafield: 'claimId', width: '10%' },
    { text: 'DOS', datafield: 'DOS', width: '10%' },
    { text: 'ServiceTypeID', datafield: 'serviceTypeID', width: '10%' },
    { text: 'NHI', datafield: 'NHI', width: '10%' },
    { text: 'AmountExclGST', datafield: 'amountExclGST', cellsformat: 'c2', width: '10%' },
    { text: 'ClaimsStatusID', datafield: 'claimStatusID', width: '10%' },
    { text: 'Summary', datafield: 'summary', width: '40%' },
  ];
  grid_getData() {
    this.claimService.getClaims().subscribe((result) => {
      this.grid_source.localdata = result;
      this.myGrid?.updatebounddata();
    });
  }

  serviceType_source: any = {
    datatype: 'json', 
    datafields: [
      { name: 'id'},
      { name: 'desc'}
    ],
    url: 'api/serviceTypes.js'
  };
  serviceType_dataAdapter: any = new jqx.dataAdapter(this.serviceType_source);

  claimStatus_source: any = {
    datatype: 'json',
    datafields: [
      { name: 'id' },
      { name: 'desc' },
    ],
    url: 'api/claimStatus.js'
  };
  claimStatus_dataAdapter: any = new jqx.dataAdapter(this.claimStatus_source);

  ngOnInit() {}

  onCloseClick(){
    this.myWindow?.hide();
  }

  onSaveClick(): void {
    if(this.myWindow?.widgetObject.title == 'Edit Claim'){
      if (this._rowIndex >= 0) {
        let rowData = this.myGrid?.getrowdata(this._rowIndex);
        rowData.serviceTypeID = this.serviceType?.val();
        rowData.DOS = this.serviceDate?.val();
        rowData.NHI = this.patientNHI?.val();
        rowData.amountExclGST = this.claimAmount?.val();
        rowData.statusID = this.claimStatus?.val();
        this.myGrid?.updaterow(this._rowIndex, rowData);
      }
    }
    if (this.myWindow?.widgetObject.title == 'New Claim') {
      let nextID = this.myGrid?.attrSource.localdata.length + 1;
      this.grid_source.localdata.push({
        claimId: nextID,
        DOS: this.serviceDate?.val(),
        serviceTypeID: this.serviceType?.val(),
        NHI: this.patientNHI?.val(),
        amountExclGST: this.claimAmount?.val(),
        claimStatusID: this.claimStatus?.val(),
        summary: 'Waiting for confirmation details',
      });
      this.myGrid?.updatebounddata();
    }
    this.myWindow?.hide();
  }

  onNewClaimClick(){
    this.serviceType?.val('-1');
    this.serviceDate?.val('');
    this.patientNHI?.val('');
    this.claimAmount?.val('');
    this.claimStatus?.val('-1');
    this.myWindow?.setTitle('New Claim');
    this.myWindow?.open();
  }

  onCellDoubleClick($event: any){
    let row = $event.args.row.bounddata;
    this._rowIndex = $event.args.rowindex;
    console.log(JSON.stringify(row));

    this.serviceType?.val(row.serviceTypeID);
    this.serviceDate?.val(row.DOS);
    this.patientNHI?.val(row.NHI);
    this.claimAmount?.val(row.amountExclGST);
    this.claimStatus?.val(row.statusID);
    
    this.myWindow?.setTitle('Edit Claim');
    this.myWindow?.open();
  }

}


