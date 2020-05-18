import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DontationsComponent } from './donations.component';

describe('DontationsComponent', () => {
  let component: DontationsComponent;
  let fixture: ComponentFixture<DontationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DontationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DontationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
