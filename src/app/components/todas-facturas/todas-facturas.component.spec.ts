import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodasFacturasComponent } from './todas-facturas.component';

describe('TodasFacturasComponent', () => {
  let component: TodasFacturasComponent;
  let fixture: ComponentFixture<TodasFacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodasFacturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodasFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
