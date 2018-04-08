import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyComponentsComponent } from './modify-components.component';

describe('ModifyComponentsComponent', () => {
  let component: ModifyComponentsComponent;
  let fixture: ComponentFixture<ModifyComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
