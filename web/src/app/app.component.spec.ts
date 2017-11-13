/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing'
import { AppComponent } from './app.component';
import { Auth } from 'app/auth/auth.service';


// Mock our Auth service
export class MockAuthService {
  public authenticated(): void {
    return;
  }
}

describe('App: Xrcise', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: Auth, useValue: new MockAuthService()}
      ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
