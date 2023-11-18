import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeccionPage } from './seccion.page';

describe('SeccionPage', () => {
  let component: SeccionPage;
  let fixture: ComponentFixture<SeccionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SeccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
