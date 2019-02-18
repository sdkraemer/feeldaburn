import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepsSetComponent } from './reps-set.component';

describe('RepsSetComponent', () => {
  let component: RepsSetComponent;
  let fixture: ComponentFixture<RepsSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepsSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepsSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
