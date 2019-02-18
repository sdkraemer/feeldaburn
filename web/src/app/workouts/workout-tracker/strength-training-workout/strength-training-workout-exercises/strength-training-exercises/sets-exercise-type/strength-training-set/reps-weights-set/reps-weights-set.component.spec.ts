import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepsWeightsSetComponent } from './reps-weights-set.component';

describe('RepsWeightsSetComponent', () => {
  let component: RepsWeightsSetComponent;
  let fixture: ComponentFixture<RepsWeightsSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepsWeightsSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepsWeightsSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
