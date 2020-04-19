import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMovieModalComponent } from './view-movie-modal.component';

describe('ViewMovieModalComponent', () => {
  let component: ViewMovieModalComponent;
  let fixture: ComponentFixture<ViewMovieModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMovieModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMovieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
