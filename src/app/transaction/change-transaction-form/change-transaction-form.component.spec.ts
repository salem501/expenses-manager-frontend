import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTransactionFormComponent } from './change-transaction-form.component';

describe('ChangeTransactionFormComponent', () => {
  let component: ChangeTransactionFormComponent;
  let fixture: ComponentFixture<ChangeTransactionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeTransactionFormComponent]
    });
    fixture = TestBed.createComponent(ChangeTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
