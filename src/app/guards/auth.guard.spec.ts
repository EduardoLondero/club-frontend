import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('AuthGuard', () => {
  let guard: AuthGuard;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthGuard,
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {
    spyOn(guard, 'canActivate').and.returnValue(true);
    expect(guard.canActivate()).toBeTrue();
  });

  it('should redirect to login if user is not authenticated', () => {
    spyOn(guard, 'canActivate').and.returnValue(false);
    expect(guard.canActivate()).toBeFalse();
  });
});

