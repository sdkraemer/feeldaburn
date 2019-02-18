import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightsSetComponent } from './weights-set.component';

describe('WeightsSetComponent', () => {
  let component: WeightsSetComponent;
  let fixture: ComponentFixture<WeightsSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightsSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightsSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
