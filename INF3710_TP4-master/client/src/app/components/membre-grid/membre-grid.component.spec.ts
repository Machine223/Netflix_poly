import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreGridComponent } from './membre-grid.component';

describe('MembreGridComponent', () => {
  let component: MembreGridComponent;
  let fixture: ComponentFixture<MembreGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembreGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembreGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
