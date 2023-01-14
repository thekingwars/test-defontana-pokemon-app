import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPokemonComponent } from './summary-pokemon.component';

describe('SummaryPokemonComponent', () => {
  let component: SummaryPokemonComponent;
  let fixture: ComponentFixture<SummaryPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryPokemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
