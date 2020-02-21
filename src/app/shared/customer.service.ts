import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private fb: FormBuilder, private firebase: AngularFireDatabase) { }
  customerList: AngularFireList<any>;

  form = this.fb.group({
    $key: [null],
    fullName: ['', Validators.required],
    email: ['', Validators.email],
    mobile: ['', [Validators.required, Validators.minLength(8)]],
    location: ['']
  });

  getCustomers() {
    this.customerList = this.firebase.list('customers');
    return this.customerList.snapshotChanges();
  }

  insertCustomer(customer) {
    this.customerList.push({
      fullName: customer.fullName,
      email: customer.email,
      mobile: customer.mobile,
      location: customer.location
    });
  }

  populateForm(customer) {
    this.form.setValue(customer);
  }

  updateCustomer(customer) {
    this.customerList.update(customer.$key,
      {
        fullName: customer.fullName,
        email: customer.email,
        mobile: customer.mobile,
        location: customer.location
    });
  }

  deleteCustomer($key: string) {
    this.customerList.remove($key);
  }
}
