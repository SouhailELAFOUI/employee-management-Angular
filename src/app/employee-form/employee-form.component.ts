import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee: any = {};
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadEmployee(id);
    }
  }

  loadEmployee(id: string): void {
    this.employeeService.getEmployee(id).subscribe(
      (data) => {
        this.employee = data;
      },
      (error) => {
        console.error('Error fetching employee', error);
      }
    );
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(
        () => {
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.error('Error updating employee', error);
        }
      );
    } else {
      this.employeeService.createEmployee(this.employee).subscribe(
        () => {
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.error('Error creating employee', error);
        }
      );
    }
  }
}