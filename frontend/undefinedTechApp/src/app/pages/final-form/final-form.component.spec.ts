import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalFormComponent } from './final-form.component';

describe('FinalFormComponent', () => {
  let component: FinalFormComponent;
  let fixture: ComponentFixture<FinalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
