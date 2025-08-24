import { Text as RNText, StyleSheet, TextProps } from 'react-native';

export type TypographyVariant =
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'label';

interface CustomTextProps extends TextProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
}

const typographyStyles = StyleSheet.create({
  title: {
    fontFamily: 'Caudex-Bold',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: 'Caudex-Regular',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'normal',
  },
  body: {
    fontFamily: 'Caudex-Regular',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'normal',
  },
  caption: {
    fontFamily: 'Caudex-Regular',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'normal',
  },
  label: {
    fontFamily: 'Caudex-Bold',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 'bold',
  },
});

export const Text = ({
  variant = 'body',
  style,
  ...props
}: CustomTextProps) => {
  return <RNText style={[typographyStyles[variant], style]} {...props} />;
};
