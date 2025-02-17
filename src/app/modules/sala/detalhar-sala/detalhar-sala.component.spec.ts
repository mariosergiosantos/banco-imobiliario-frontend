import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharSalaComponent } from './detalhar-sala.component';

describe('DetalharSalaComponent', () => {
  let component: DetalharSalaComponent;
  let fixture: ComponentFixture<DetalharSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalharSalaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalharSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
