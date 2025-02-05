import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumComponent } from './stadium.component';

describe('StadiumComponent', () => {
  let component: StadiumComponent;
  let fixture: ComponentFixture<StadiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StadiumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
