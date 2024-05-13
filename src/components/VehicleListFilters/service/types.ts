export interface FiltersSectionOptionsProps {
  icon: { src?: string; alt?: string };
  key: string;
  label: string;
}

export interface FilterOption {
  title: string;
  key: string;
  options: FiltersSectionOptionsProps[];
}

export interface FiltersSectionProps {
  filterOptions: {
    title: string;
    options: FiltersSectionOptionsProps[];
  };
}

export interface FieldsMappedProps {
  filterOptionsList: FilterOption[];
  labels: {
    resetFilters: string;
    trimAvailablePlural: string;
    trimAvailableSingular: string;
  };
}

export interface FilterListProps {
  filterOptionsList: FilterOption[];
}

export interface FiltersListMobile {
  isMobileFiltersOpen: boolean;
  setMobileFiltersOpen: (value: any) => void;
}

export enum CurrentListTypes {
  Models = 'models',
  Trims = 'trims',
}
