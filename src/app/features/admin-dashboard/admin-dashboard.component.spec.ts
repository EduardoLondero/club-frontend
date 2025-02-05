import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSportsComponent } from '../admin-sports/admin-sports.component';
import { SportsService } from '../../services/sport.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminSportsComponent', () => {
  let component: AdminSportsComponent;
  let fixture: ComponentFixture<AdminSportsComponent>;
  let sportsService: jasmine.SpyObj<SportsService>;

  beforeEach(async () => {
    const sportServiceSpy = jasmine.createSpyObj('SportService', ['getSports', 'removeSport']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdminSportsComponent],
      providers: [{ provide: sportServiceSpy, useValue: sportServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSportsComponent);
    component = fixture.componentInstance;
    sportsService = TestBed.inject(SportsService) as jasmine.SpyObj<SportsService>;
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
    sportsService.deleteSport.and.returnValue(of({ message: 'Sport removed successfully' }));

    component.sportToDeleteId = 3;
    component.deleteSport();

    expect(sportsService.deleteSport).toHaveBeenCalledWith(3);
    expect(component.showDeleteModal).toBeFalse();
  });

  it('Debe manejar errores al eliminar un deporte', () => {
    sportsService.deleteSport.and.returnValue(throwError(() => new Error('No se puede eliminar el deporte')));

    component.sportToDeleteId = 3;
    component.deleteSport();

    expect(component.errorMessage).toBe('No se puede eliminar el deporte');
  });
});
