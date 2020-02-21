import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customerArray = [];
  showDeleteMessage: boolean;
  searchText = '';

  constructor(private customerService: CustomerService) { }

  get customersService() {
    return this.customerService;
  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(list => {
      this.customerArray = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  onDelete($key) {
    if (confirm('Are you sure to delete this record?')) {
      this.customerService.deleteCustomer($key);
      this.showDeleteMessage = true;
      setTimeout(() => this.showDeleteMessage = false, 2000);
    }
  }

  filterCondition(customer) {
    return customer.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
  }
}
