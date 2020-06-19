import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSeccionesComponent } from './navbarSecciones.component';

describe('NavbarSeccionesComponent', () => {
  let component: NavbarSeccionesComponent;
  let fixture: ComponentFixture<NavbarSeccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarSeccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
