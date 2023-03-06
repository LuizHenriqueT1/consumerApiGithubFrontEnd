import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerUserComponent } from './consumer-user.component';

describe('ConsumerUserComponent', () => {
  let component: ConsumerUserComponent;
  let fixture: ComponentFixture<ConsumerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
