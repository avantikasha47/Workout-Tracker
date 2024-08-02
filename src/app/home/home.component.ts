import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutChartComponent } from '../workout-chart/workout-chart.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, WorkoutChartComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  searchControl: FormControl = new FormControl('');
  filterControl: FormControl = new FormControl('');
  users: { [key: string]: { name: string; workoutTypes: { [type: string]: number }; workoutMinutes: number; numberOfWorkouts: number } } = {};
  workoutMinutesValue: number = 0;
  workoutTypes: string[] = ['Cardio', 'Yoga', 'Flexibility', 'Strength-training', 'Swimming','Cycling','Endurance'];

  currentPage: number = 1;
  itemsPerPage: number = 3;

  selectedUser: string = '';
  chartData: any = {};
  chartType: 'bar' | 'line' | 'pie' = 'bar';
  isChartVisible: boolean = false;
  isFormVisible: boolean = true;
  isListVisible: boolean = true;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      userName: ['', [Validators.required, this.alphabeticValidator]],
      workoutType: [''],
      workoutMinutes: [0]
    });

    this.workoutMinutesValue = this.form.get('workoutMinutes')?.value || 0;

    this.searchControl.valueChanges.subscribe(() => this.filteredUsers());
    this.filterControl.valueChanges.subscribe(() => this.filteredUsers());
  }

  ngOnInit(): void {
    // Initialize chartData if needed
  }

  addUser() {
    const newUser = this.form.value;
    if (this.form.valid) {
      const name = newUser.userName || '';
      const workoutType = newUser.workoutType || '';
      const workoutMinutes = newUser.workoutMinutes || 0;

      if (!this.users[name]) {
        this.users[name] = {
          name,
          workoutTypes: {},
          workoutMinutes: 0,
          numberOfWorkouts: 0
        };
      }

      if (workoutType) {
        if (this.users[name].workoutTypes[workoutType] !== undefined) {
          this.users[name].workoutTypes[workoutType] += workoutMinutes;
        } else {
          this.users[name].workoutTypes[workoutType] = workoutMinutes;
        }
      }

      this.users[name].workoutMinutes = Object.values(this.users[name].workoutTypes).reduce((a, b) => a + b, 0);
      this.users[name].numberOfWorkouts = Object.keys(this.users[name].workoutTypes).length;

      this.form.reset();
      this.workoutMinutesValue = 0;

      this.updateChartData();
    }
  }

  onMinutesChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.workoutMinutesValue = +input.value;
    this.form.patchValue({ workoutMinutes: this.workoutMinutesValue });
  }

  onMinutesInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.workoutMinutesValue = +input.value;
    this.form.patchValue({ workoutMinutes: this.workoutMinutesValue });
  }

  filteredUsers() {
    const searchTerm = this.searchControl.value.toLowerCase();
    const filterType = this.filterControl.value.toLowerCase();

    return Object.values(this.users).filter(user =>
      (user.name.toLowerCase().includes(searchTerm)) &&
      (filterType === '' || filterType === 'all' || Object.keys(user.workoutTypes).some(type => type.toLowerCase().includes(filterType)))
    );
  }

  getWorkoutTypes(workoutTypes: { [type: string]: number }): string[] {
    return Object.keys(workoutTypes);
  }

  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers().slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers().length / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  updateChartData() {
    const selectedUser = this.users[this.selectedUser];
    if (selectedUser) {
      const labels = Object.keys(selectedUser.workoutTypes);
      const data = Object.values(selectedUser.workoutTypes);
      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Workout Minutes',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
    } else {
      this.chartData = {
        labels: [],
        datasets: []
      };
    }
  }

  alphabeticValidator(control: FormControl) {
    const value = control.value || '';
    const isValid = /^[a-zA-Z\s]+$/.test(value);
    return isValid ? null : { alphabetic: true };
  }
  toggleChart() {
    // Toggle chart visibility
    this.isChartVisible = !this.isChartVisible;

    // Update visibility of form and list based on the new state of the chart
    if (this.isChartVisible) {
        // Hide form and list
        this.isFormVisible = false;
        this.isListVisible = false;
    } else {
        // Show form and list
        this.isFormVisible = true;
        this.isListVisible = true;
    }
}



}
