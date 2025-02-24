import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAutorComponent } from './editar-autor.component';

describe('EditarAutorComponent', () => {
  let component: EditarAutorComponent;
  let fixture: ComponentFixture<EditarAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
