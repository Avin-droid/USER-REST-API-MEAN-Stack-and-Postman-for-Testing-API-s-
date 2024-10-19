import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskupdateComponent } from './taskupdate.component';

describe('TaskupdateComponent', () => {
  let component: TaskupdateComponent;
  let fixture: ComponentFixture<TaskupdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskupdateComponent]
    });
    fixture = TestBed.createComponent(TaskupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
