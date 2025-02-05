import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportComissionComponent } from './sport-comission.component';

describe('SportComissionComponent', () => {
  let component: SportComissionComponent;
  let fixture: ComponentFixture<SportComissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportComissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportComissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
