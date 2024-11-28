import { CSSProperties } from "react";

export interface DashboardIndicatorProps {
  value?: number | undefined;
  percentage?: number;
  title?: string;
  image?: string;
  arrowIcon?: string;
  icon?: string | undefined;
  styles?: {
    indicatorMainContainer?: CSSProperties;
    borderRight?: {
      xs?: string;
      sm?: string;
      md?: string;
      lg?: string;
      xl?: string;
    };
  };
}
