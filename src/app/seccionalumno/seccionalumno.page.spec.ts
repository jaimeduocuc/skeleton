import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeccionalumnoPage } from './seccionalumno.page';

describe('SeccionalumnoPage', () => {
  let component: SeccionalumnoPage;
  let fixture: ComponentFixture<SeccionalumnoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SeccionalumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
