import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.form.controls;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }
  get form() {
    return this.customerService.form;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.form.get('$key').value === null) {
        this.customerService.insertCustomer(this.customerService.form.value);
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 2000);
      } else {
        this.customerService.updateCustomer(this.customerService.form.value);
        this.showSuccessMessage = true;
        setTimeout(() => (this.showSuccessMessage = false), 2000);
      }
      this.submitted = false;
      this.customerService.form.reset();
      this.customerService.form.setValue({
        $key: null,
        fullName: '',
        email: '',
        mobile: '',
        location: ''
      });
    }
  }

}
