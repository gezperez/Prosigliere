/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/app/ds/components/Text/enums/Colors';
import { useAppSelector } from '@/store/hooks';
import { selectSelectedHouse } from '@/store/selectors/characters';

export const useThemeColor = () => {
  const selectedHouse = useAppSelector(selectSelectedHouse);

  const themeBackgroundColor = selectedHouse?.color || Colors.LIGHT_BROWN;

  return {
    themeBackgroundColor,
    lighterThemeColor: selectedHouse?.lightColor || Colors.LIGHT_BROWN,
    selectedHouse,
  };
};
