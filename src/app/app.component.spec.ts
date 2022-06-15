import { HttpClientModule } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonApiService } from 'src/services/pokemon-api.service';
import { PokemonListService } from 'src/services/pokemon-list.service';
import { AppComponent } from './app.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { PokemonTableComponent } from './pokemon-table/pokemon-table.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserModule
      ],
      declarations: [
        AppComponent,
        PokemonFormComponent,
        PokemonTableComponent
      ],
      providers: [PokemonListService, PokemonApiService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Listado de Pokemon'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Listado de Pokemon');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Listado de Pokemon');
  });

  it('should invoke onCreateNew on button click', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    spyOn(fixture.componentInstance, 'onCreateNew');
    const button = compiled.querySelector('button');
    button?.click();
    tick();
    expect(fixture.componentInstance.onCreateNew).toHaveBeenCalled();
  }));

  it('should set showForm to true when onCreateNew is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.componentInstance.onCreateNew();
    expect(fixture.componentInstance.showForm).toBeTrue();
  });

  it('should render form when showForm', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.componentInstance.showForm = true;
    fixture.detectChanges();
    expect(compiled.querySelector('app-pokemon-form')).toBeTruthy();
  });

  it('should emit the searchTerm on type', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const listService = TestBed.inject(PokemonListService);
    spyOn(listService.searchTerm, 'next');
    app.searchTerm = 'test';
    app.onSearch();
    expect(listService.searchTerm.next).toHaveBeenCalledWith('test');
  });
});
