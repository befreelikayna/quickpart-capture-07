import { DocumentedPart } from "@/types/parts";

const STORAGE_KEY = 'documented_parts';
const LANGUAGE_KEY = 'app_language';

export const saveDocumentedParts = (parts: DocumentedPart[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parts));
    console.log('Saved documented parts:', parts);
  } catch (error) {
    console.error('Error saving documented parts:', error);
  }
};

export const loadDocumentedParts = (): DocumentedPart[] => {
  try {
    const savedParts = localStorage.getItem(STORAGE_KEY);
    if (savedParts) {
      console.log('Loaded documented parts:', JSON.parse(savedParts));
      return JSON.parse(savedParts);
    }
  } catch (error) {
    console.error('Error loading documented parts:', error);
  }
  return [];
};

export const saveLanguage = (language: 'en' | 'de' | 'ro') => {
  try {
    localStorage.setItem(LANGUAGE_KEY, language);
    console.log('Saved language:', language);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

export const loadLanguage = (): 'en' | 'de' | 'ro' => {
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY) as 'en' | 'de' | 'ro';
    if (savedLanguage) {
      console.log('Loaded language:', savedLanguage);
      return savedLanguage;
    }
  } catch (error) {
    console.error('Error loading language:', error);
  }
  return 'en';
};