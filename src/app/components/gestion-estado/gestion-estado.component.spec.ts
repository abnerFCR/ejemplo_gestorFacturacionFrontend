import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEstadoComponent } from './gestion-estado.component';

describe('GestionEstadoComponent', () => {
  let component: GestionEstadoComponent;
  let fixture: ComponentFixture<GestionEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionEstadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
