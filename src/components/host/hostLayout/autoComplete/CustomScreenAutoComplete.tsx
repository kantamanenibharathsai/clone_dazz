import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Box, SxProps, TextField, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { customAcStyles } from "./AutoCompleteSyles";
import { IScreen } from "../../../../redux/reducers/adminReducers/screenSlice";

interface IProps {
  options: IScreen[];
  value: IScreen | null | undefined;
  onChange: (screen: IScreen | null) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  searchStateValue?: string;
  option: string;
  placeHolder: string;
  disable: boolean;
  textFieldOnchange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  sxStyles?: SxProps;
}

const CustomAutocomplete = ({
  options,
  value,
  onChange,
  textFieldOnchange,
  currentPage,
  totalPages,
  setCurrentPage,
  option,
  placeHolder,
  searchValue,
  disable,
  sxStyles,
}: IProps) => {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    textFieldOnchange(event);
  };
  const onClickValue = (item: IScreen) => {
    onChange(item);
    setOpenDropDown(false);
  };
  const onFocusTextField = () => {
    setOpenDropDown(true);
  };

  const openCloseWithArrow = () => {
    setOpenDropDown((prev) => !prev);
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovie = useCallback(
    (node: HTMLParagraphElement) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (currentPage < totalPages) {
            setCurrentPage((prev: number) => prev + 1);
          }
        }
      });

      if (node) observer.current.observe(node);
    },
    [currentPage, totalPages, setCurrentPage]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenDropDown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [value, searchValue, setOpenDropDown, onChange, option]);
  return (
    <Box sx={customAcStyles.autocompleteContainer} ref={ref}>
      <TextField
        InputProps={{
          endAdornment: (
            <KeyboardArrowDownIcon
              onClick={openCloseWithArrow}
              sx={
                openDropDown
                  ? customAcStyles.transformDownArrowStyles
                  : customAcStyles.downArrowStyles
              }
            />
          ),
        }}
        autoComplete="off"
        disabled={disable}
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onFocus={onFocusTextField}
        fullWidth
        placeholder={placeHolder}
      />
      {openDropDown && (
        <Box sx={customAcStyles.autocompleteDropdown}>
          {options.length ? (
            options.map((item, index) => {
              if (options.length === index + 1)
                return (
                  <Box
                    key={index}
                    sx={customAcStyles.autocompleteItem}
                    ref={lastMovie}
                    onClick={() => onClickValue(item)}
                  >
                    {item.screenName}
                  </Box>
                );
              return (
                <Box
                  key={index}
                  sx={customAcStyles.autocompleteItem}
                  onClick={() => {
                    onClickValue(item);
                  }}
                >
                  {item.screenName}
                </Box>
              );
            })
          ) : (
            <Typography sx={customAcStyles.loadingText}>Loading...</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CustomAutocomplete;
