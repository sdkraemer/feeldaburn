import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondsExerciseTypeComponent } from './seconds-exercise-type.component';

describe('SecondsExerciseTypeComponent', () => {
  let component: SecondsExerciseTypeComponent;
  let fixture: ComponentFixture<SecondsExerciseTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondsExerciseTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondsExerciseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
