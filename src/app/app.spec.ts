import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter, withDisabledInitialNavigation } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App], // Standalone
      providers: [provideRouter([], withDisabledInitialNavigation())]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render navbar brand', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    // prüfe deine Navbar (passt "Deniz" ggf. an deinen brand-Text an)
    expect(el.querySelector('.nav__brand')?.textContent?.trim()).toContain('Deniz');
  });

  it('should have a router outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('router-outlet')).not.toBeNull();
  });
});
