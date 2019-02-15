import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedExerciseTypeComponent } from './completed-exercise-type.component';

describe('CompletedExerciseTypeComponent', () => {
  let component: CompletedExerciseTypeComponent;
  let fixture: ComponentFixture<CompletedExerciseTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedExerciseTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedExerciseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
