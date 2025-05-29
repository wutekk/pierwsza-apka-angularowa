import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KartaZRzeczomComponent } from './karta-z-rzeczom.component';

describe('KartaZRzeczomComponent', () => {
  let component: KartaZRzeczomComponent;
  let fixture: ComponentFixture<KartaZRzeczomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KartaZRzeczomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KartaZRzeczomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
