import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsSaveComponent } from './forms-save.component';

describe('FormsSaveComponent', () => {
  let component: FormsSaveComponent;
  let fixture: ComponentFixture<FormsSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
