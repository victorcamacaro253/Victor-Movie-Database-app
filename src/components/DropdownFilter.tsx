import { useTheme } from '../context/ThemeContext';

interface DropdownFilterProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  theme?: 'light' | 'dark'; // Optional theme prop for flexibility
}

export default function DropdownFilter({ 
  label, 
  options, 
  value, 
  onChange,
  theme: propTheme // Optional prop to override context theme
}: DropdownFilterProps) {
  const contextTheme = useTheme().theme;
  const theme = propTheme || contextTheme; // Use prop if provided, otherwise context
  
  // Theme-based classes
  const themeClasses = {
    label: theme === 'dark' ? 'text-gray-300' : 'text-gray-700',
    select: {
      base: 'w-full p-2 border rounded-md transition-colors duration-200',
      light: 'border-gray-300 bg-white text-gray-900 hover:border-gray-400',
      dark: 'border-gray-600 bg-gray-700 text-white hover:border-gray-500',
      focus: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
    },
    option: {
      light: 'bg-white text-gray-900',
      dark: 'bg-gray-700 text-white'
    }
  };

  return (
    <div className="flex-1 min-w-[150px]">
      <label className={`block text-sm font-medium mb-1 ${themeClasses.label}`}>
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={`
          ${themeClasses.select.base}
          ${theme === 'dark' ? themeClasses.select.dark : themeClasses.select.light}
          ${themeClasses.select.focus}
        `}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className={theme === 'dark' ? themeClasses.option.dark : themeClasses.option.light}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}