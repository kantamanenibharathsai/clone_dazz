import { ReactNode } from "react";
export interface MediaCardProps {
  genreImg: string;
  genreText: string;
  clickable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  doneIcon?: boolean;
  extraIcon?: ReactNode;
  styles?: {
    mainContainer: {
      width: string;
      height: string;
    };
    hexogonImgContainer: {
      width: string;
      height: string;
    };
    imgStyles: {
      bottom: number;
      left: number;
      width: string;
    };
  };
}
