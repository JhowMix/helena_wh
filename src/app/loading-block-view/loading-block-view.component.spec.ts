import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBlockViewComponent } from './loading-block-view.component';

describe('LoadingBlockViewComponent', () => {
  let component: LoadingBlockViewComponent;
  let fixture: ComponentFixture<LoadingBlockViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingBlockViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingBlockViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
