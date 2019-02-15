import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SetsExerciseTypeComponent } from "./sets-exercise-type.component";

describe("SetsExerciseTypeComponentComponent", () => {
  let component: SetsExerciseTypeComponent;
  let fixture: ComponentFixture<SetsExerciseTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SetsExerciseTypeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetsExerciseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
