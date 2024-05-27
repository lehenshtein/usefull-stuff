import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownGeneratorComponent } from './dropdown-generator.component';

describe('DropdownGeneratorComponent', () => {
  let component: DropdownGeneratorComponent;
  let fixture: ComponentFixture<DropdownGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
