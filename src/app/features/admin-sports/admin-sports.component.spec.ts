import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSportsComponent } from './admin-sports.component';
import { SportsService } from '../../services/sport.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminSportsComponent', () => {
  let component: AdminSportsComponent;
  let fixture: ComponentFixture<AdminSportsComponent>;
  let sportService: jasmine.SpyObj<SportsService>;

  beforeEach(async () => {
    const sportServiceSpy = jasmine.createSpyObj('SportService', ['getSports', 'removeSport']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdminSportsComponent],
      providers: [{ provide: SportsService, useValue: sportServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSportsComponent);
    component = fixture.componentInstance;
    sportService = TestBed.inject(SportsService) as jasmine.SpyObj<SportsService>;
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe abrir el modal de eliminación con el ID correcto', () => {
    component.openDeleteModal(3);
    expect(component.showDeleteModal).toBeTrue();
    expect(component.sportToDeleteId).toBe(3);
  });

  it('Debe eliminar un deporte y cerrar el modal', () => {
    sportService.deleteSport.and.returnValue(of({ message: 'Sport removed successfully' }));

    component.sportToDeleteId = 3;
    component.deleteSport();

    expect(sportService.deleteSport).toHaveBeenCalledWith(3);
    expect(component.showDeleteModal).toBeFalse();
  });

  it('Debe manejar errores al eliminar un deporte', () => {
    sportService.deleteSport.and.returnValue(throwError(() => new Error('No se puede eliminar el deporte')));

    component.sportToDeleteId = 3;
    component.deleteSport();

    expect(component.errorMessage).toBe('No se puede eliminar el deporte');
  });
});
