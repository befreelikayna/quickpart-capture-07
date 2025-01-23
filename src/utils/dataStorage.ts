import { DocumentedPart } from "@/types/parts";

const MARBER_STORAGE_KEY = 'marber_documented_parts';
const BLADE_STORAGE_KEY = 'blade_documented_parts';
const LANGUAGE_KEY = 'app_language';

export const saveMarberParts = (parts: DocumentedPart[]) => {
  try {
    localStorage.setItem(MARBER_STORAGE_KEY, JSON.stringify(parts));
    console.log('Saved Marber parts:', parts);
  } catch (error) {
    console.error('Error saving Marber parts:', error);
  }
};

export const loadMarberParts = (): DocumentedPart[] => {
  try {
    const savedParts = localStorage.getItem(MARBER_STORAGE_KEY);
    if (savedParts) {
      console.log('Loaded Marber parts:', JSON.parse(savedParts));
      return JSON.parse(savedParts);
    }
  } catch (error) {
    console.error('Error loading Marber parts:', error);
  }
  return [];
};

export const saveBladeParts = (parts: DocumentedPart[]) => {
  try {
    localStorage.setItem(BLADE_STORAGE_KEY, JSON.stringify(parts));
    console.log('Saved Blade parts:', parts);
  } catch (error) {
    console.error('Error saving Blade parts:', error);
  }
};

export const loadBladeParts = (): DocumentedPart[] => {
  try {
    const savedParts = localStorage.getItem(BLADE_STORAGE_KEY);
    if (savedParts) {
      console.log('Loaded Blade parts:', JSON.parse(savedParts));
      return JSON.parse(savedParts);
    }
  } catch (error) {
    console.error('Error loading Blade parts:', error);
  }
  return [];
};

export const saveLanguage = (language: 'en' | 'ar' | 'fr') => {
  try {
    localStorage.setItem(LANGUAGE_KEY, language);
    console.log('Saved language:', language);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

export const loadLanguage = (): 'en' | 'ar' | 'fr' => {
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY) as 'en' | 'ar' | 'fr';
    if (savedLanguage) {
      console.log('Loaded language:', savedLanguage);
      return savedLanguage;
    }
  } catch (error) {
    console.error('Error loading language:', error);
  }
  return 'en';
};