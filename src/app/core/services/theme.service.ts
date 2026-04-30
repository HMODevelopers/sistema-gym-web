import { Injectable } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'sistema_gym_theme';
  private currentTheme: ThemeMode = 'light';

  initTheme(): void {
    const storedTheme = this.getStoredTheme();
    const themeToApply = storedTheme ?? 'light';
    this.applyTheme(themeToApply);
  }

  getTheme(): ThemeMode {
    return this.currentTheme;
  }

  setTheme(theme: ThemeMode): void {
    this.applyTheme(theme);
    localStorage.setItem(this.storageKey, theme);
  }

  toggleTheme(): void {
    this.setTheme(this.isDarkMode() ? 'light' : 'dark');
  }

  isDarkMode(): boolean {
    return this.currentTheme === 'dark';
  }

  private getStoredTheme(): ThemeMode | null {
    const storedTheme = localStorage.getItem(this.storageKey);
    return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null;
  }

  private applyTheme(theme: ThemeMode): void {
    this.currentTheme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
}
