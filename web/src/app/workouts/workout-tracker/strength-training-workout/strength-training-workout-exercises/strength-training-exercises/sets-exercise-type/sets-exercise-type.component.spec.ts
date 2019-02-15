import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsExerciseTypeComponentComponent } from './sets-exercise-type-component.component';

describe('SetsExerciseTypeComponentComponent', () => {
  let component: SetsExerciseTypeComponentComponent;
  let fixture: ComponentFixture<SetsExerciseTypeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetsExerciseTypeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetsExerciseTypeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
