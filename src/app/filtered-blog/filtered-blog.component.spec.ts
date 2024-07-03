import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredBlogComponent } from './filtered-blog.component';

describe('FilteredBlogComponent', () => {
  let component: FilteredBlogComponent;
  let fixture: ComponentFixture<FilteredBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FilteredBlogComponent]
    });
    fixture = TestBed.createComponent(FilteredBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
