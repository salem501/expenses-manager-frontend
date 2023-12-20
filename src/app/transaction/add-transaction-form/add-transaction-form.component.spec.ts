import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionFormComponent } from './add-transaction-form.component';

describe('AddTransactionFormComponent', () => {
  let component: AddTransactionFormComponent;
  let fixture: ComponentFixture<AddTransactionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTransactionFormComponent]
    });
    fixture = TestBed.createComponent(AddTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
