import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Import CommonModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  form: FormGroup;
  searchControl: FormControl = new FormControl('');
  filterControl: FormControl = new FormControl('');
  users: { [key: string]: { name: string; workoutTypes: { [type: string]: number }; workoutMinutes: number; numberOfWorkouts: number } } = {};
  workoutMinutesValue: number = 0;
  workoutTypes: string[] = ['Cardio', 'Strength', 'Flexibility', 'Balance', 'Endurance'];

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      userName: [''],
      workoutType: [''],
      workoutMinutes: [0]
    });

    this.workoutMinutesValue = this.form.get('workoutMinutes')?.value || 0;

    this.searchControl.valueChanges.subscribe(() => this.filteredUsers());
    this.filterControl.valueChanges.subscribe(() => this.filteredUsers());
  }

  addUser() {
    const newUser = this.form.value;
    console.log('Form Data:', newUser);
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

      // Update or add workout type
      if (workoutType) {
        if (this.users[name].workoutTypes[workoutType] !== undefined) {
          // If workout type already exists, just update the minutes
          this.users[name].workoutTypes[workoutType] += workoutMinutes;
        } else {
          // If workout type does not exist, add it
          this.users[name].workoutTypes[workoutType] = workoutMinutes;
        }
      }

      // Calculate the total workout minutes
      this.users[name].workoutMinutes = Object.values(this.users[name].workoutTypes).reduce((a, b) => a + b, 0);

      // Number of distinct workout types
      this.users[name].numberOfWorkouts = Object.keys(this.users[name].workoutTypes).length;

      console.log('Users:', this.users);
      this.form.reset();
      this.workoutMinutesValue = 0;
    } else {
      console.log('Form is invalid');
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

  // Pagination methods
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
}
