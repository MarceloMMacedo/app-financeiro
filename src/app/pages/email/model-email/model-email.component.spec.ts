import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelEmailComponent } from './model-email.component';

describe('ModelEmailComponent', () => {
  let component: ModelEmailComponent;
  let fixture: ComponentFixture<ModelEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
