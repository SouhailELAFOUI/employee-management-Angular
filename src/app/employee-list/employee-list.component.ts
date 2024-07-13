import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'position', 'actions'];
  searchTerm: string = '';

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
        this.filteredEmployees = data; // Initialize filteredEmployees with all employees
      },
      (error) => { console.error('Error fetching employees', error); }
    );
  }

  // Search Filtering Logic
  filterEmployees(): void {
    this.filteredEmployees = this.employees.filter(employee => {
      return employee.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             employee.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             employee.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             employee.position.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  deleteEmployee(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this employee?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(id).subscribe(
          () => {
            this.loadEmployees();
          },
          (error) => {
            console.error('Error deleting employee', error);
          }
        );
      }
    });
  }
}