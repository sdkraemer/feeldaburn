import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustWeightMenuComponent } from './adjust-weight-menu.component';

describe('AdjustWeightMenuComponent', () => {
  let component: AdjustWeightMenuComponent;
  let fixture: ComponentFixture<AdjustWeightMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustWeightMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustWeightMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
