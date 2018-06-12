import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteandoComponent } from './testeando.component';

describe('TesteandoComponent', () => {
  let component: TesteandoComponent;
  let fixture: ComponentFixture<TesteandoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteandoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
