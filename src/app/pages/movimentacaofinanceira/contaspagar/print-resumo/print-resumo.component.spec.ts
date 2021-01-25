import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintResumoComponent } from './print-resumo.component';

describe('PrintResumoComponent', () => {
  let component: PrintResumoComponent;
  let fixture: ComponentFixture<PrintResumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintResumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
