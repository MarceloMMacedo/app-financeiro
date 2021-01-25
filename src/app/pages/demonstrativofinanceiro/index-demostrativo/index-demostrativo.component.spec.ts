import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDemostrativoComponent } from './index-demostrativo.component';

describe('IndexDemostrativoComponent', () => {
  let component: IndexDemostrativoComponent;
  let fixture: ComponentFixture<IndexDemostrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexDemostrativoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDemostrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
