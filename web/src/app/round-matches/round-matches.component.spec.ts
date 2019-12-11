import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoundMatchesComponent} from './round-matches.component';

describe('RoundMatchesComponent', () => {
  let component: RoundMatchesComponent;
  let fixture: ComponentFixture<RoundMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
