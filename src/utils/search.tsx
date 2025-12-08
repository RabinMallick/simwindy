interface Country {
  name: string;
  code: string;
  link?: string;
}

// List of popular countries
export const popularCountries: Country[] = [
  { name: 'Bangladesh', code: 'BD' },
  { name: 'India', code: 'IN' },
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
];

// Full list of countries
export const countries: Country[] = [
  ...popularCountries,
  { name: 'Malaysia', code: 'MY' },
  { name: 'Singapore', code: 'SG' },
  { name: 'China', code: 'CN' },
  { name: 'Russia', code: 'RU' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'Pakistan', code: 'PK' },
  { name: 'Nigeria', code: 'NG' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Philippines', code: 'PH' },
  { name: 'Vietnam', code: 'VN' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Egypt', code: 'EG' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'Japan', code: 'JP' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Argentina', code: 'AR' }, 
];
