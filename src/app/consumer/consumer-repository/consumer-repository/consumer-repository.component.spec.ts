import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerRepositoryComponent } from './consumer-repository.component';

describe('ConsumerRepositoryComponent', () => {
  let component: ConsumerRepositoryComponent;
  let fixture: ComponentFixture<ConsumerRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerRepositoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
