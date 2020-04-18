import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmssComponent } from './filmss.component';

describe('FilmssComponent', () => {
  let component: FilmssComponent;
  let fixture: ComponentFixture<FilmssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
