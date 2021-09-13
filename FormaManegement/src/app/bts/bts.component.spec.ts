import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtsComponent } from './bts.component';

describe('BtsComponent', () => {
  let component: BtsComponent;
  let fixture: ComponentFixture<BtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
