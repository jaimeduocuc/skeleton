import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordarpassPage } from './recordarpass.page';

describe('RecordarpassPage', () => {
  let component: RecordarpassPage;
  let fixture: ComponentFixture<RecordarpassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecordarpassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
