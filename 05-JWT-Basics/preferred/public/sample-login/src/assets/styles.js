import { createTheme } from '@mui/material/styles';

const customColors = {
  blackMedium: '#1D2126',
  blackLight: '#323232',
  backgroundLight: '#fbfbfb',
  grey: '#E8E8E8',
  greyDark: '#565656',
  greyMedium: '#B2BAC2',
  greyLight: '#dff3fe',
  white: '#FFFFFF',
  blueDark: '#1865c3',
  blueMedium: '#3178f3',
  orangeDark: '#F1662A',
  greenMedium: '#3BB98A',
  hover: '#f4faff',
};

export const defaultTheme = createTheme({
  palette: {
    background: {
      default: customColors.blackLight,
    },
  },
});

export default customColors;
