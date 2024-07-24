import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
formvalue !:FormGroup
employeeModelObj : EmployeeModel = new EmployeeModel();
employeeData!:any;

  constructor(private fb:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.fb.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      Salary:['']
    })
    this.getAllEmployee();
 }
  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formvalue.value.firstName;
    this.employeeModelObj.lastName = this.formvalue.value.lastName;
    this.employeeModelObj.email = this.formvalue.value.email;
    this.employeeModelObj.mobile = this.formvalue.value.mobile;
    this.employeeModelObj.Salary = this.formvalue.value.Salary;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res)
      alert("Employee Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formvalue.reset()
      this.getAllEmployee()
    },
    err=>{
      alert("something went wrong")
    })
    
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }
  deleteEmployee(row:any){
    this.api.deleteEmployee(row)
    .subscribe(res=>{
      alert("Employee Deleted")
      this.getAllEmployee()
    })
  }
  onEdit(row:any){
    this.employeeModelObj.id = row.id
    this.formvalue.controls['firstName'].setValue(row.firstName)
    this.formvalue.controls['lastName'].setValue(row.lastName)
    this.formvalue.controls['email'].setValue(row.email)
    this.formvalue.controls['mobile'].setValue(row.mobile)
    this.formvalue.controls['Salary'].setValue(row.Salary)
    console.log(this.employeeModelObj)
  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formvalue.value.firstName;
    this.employeeModelObj.lastName = this.formvalue.value.lastName;
    this.employeeModelObj.email = this.formvalue.value.email;
    this.employeeModelObj.mobile = this.formvalue.value.mobile;
    this.employeeModelObj.Salary = this.formvalue.value.Salary;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("updated successfully")
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formvalue.reset()
      this.getAllEmployee()
    })
  }
}
