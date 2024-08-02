import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { WorkoutChartComponent } from '../workout-chart/workout-chart.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        WorkoutChartComponent,
        HomeComponent // Import standalone component here
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should invalidate the form if the username is not alphabetic', () => {
    component.form.controls['userName'].setValue('123');
    expect(component.form.invalid).toBeTruthy();
  });
  
  it('should validate the form if the username is alphabetic', () => {
    component.form.controls['userName'].setValue('John Doe');
    expect(component.form.valid).toBeTruthy();
  });
  it('should add a new user correctly', () => {
    component.form.controls['userName'].setValue('John Doe');
    component.form.controls['workoutType'].setValue('Cardio');
    component.form.controls['workoutMinutes'].setValue(30);
    
    component.addUser();
    
    expect(component.users['John Doe']).toBeDefined();
    expect(component.users['John Doe'].workoutTypes['Cardio']).toEqual(30);
  });

  // Add more tests for your component's functionality
});
