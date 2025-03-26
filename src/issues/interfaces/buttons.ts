enum ButtonSize{
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
  XLARGE = 'xl'
}

interface FloatingButtonsProps {
  icon: string;
  color?: string;
  size?: ButtonSize;
  action: () => void;
}

export {
  ButtonSize,
}
export type {
  FloatingButtonsProps
}

