import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeporteDetalleComponent } from './deporte-detalle.component';

describe('DeporteDetalleComponent', () => {
  let component: DeporteDetalleComponent;
  let fixture: ComponentFixture<DeporteDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeporteDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeporteDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
