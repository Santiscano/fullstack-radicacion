import Button from "@mui/material/Button";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useLayoutEffect, useRef } from "react";
import useContextProvider from "../../../../../Context/GeneralValuesContext";
import ModalInfoFile from "../../ModalForm";

export const ButtonOpenModalEdit = (params: GridRenderCellParams<any>) => {
  const { hasFocus, value } = params;
  // console.log("value: ", value);
  // console.log("params: ", params);
  const buttonElement = useRef<HTMLButtonElement | null>(null);
  const rippleRef = useRef<TouchRippleActions | null>(null);

  // useState
  const { openModalAuth, handleOpenModalAuth } = useContextProvider();
  // ----------------------------------------
  // Methods
  // ----------------------------------------

  useLayoutEffect(() => {
    if (hasFocus) {
      // console.log("hasFocus: ", hasFocus);
      const input = buttonElement.current?.querySelector("input");
      input?.focus();
    } else if (rippleRef.current) {
      // Only available in @mui/material v5.4.1 or later
      rippleRef.current.stop({} as any);
    }
  }, [hasFocus]);

  return (
    <>
      <Button
        component="button"
        ref={buttonElement}
        touchRippleRef={rippleRef}
        variant="contained"
        size="small"
        style={{ marginLeft: 1 }}
        // Remove button from tab sequence when cell does not have focus
        tabIndex={hasFocus ? 0 : -1}
        onKeyDown={(event: React.KeyboardEvent) => {
          if (event.key === " ") {
            // Prevent key navigation when focus is on button
            event.stopPropagation();
          }
        }}
        onClick={handleOpenModalAuth}
      >
        Abrir {params.id}
      </Button>
      <ModalInfoFile
        key={params.row.id}
        open={openModalAuth}
        close={handleOpenModalAuth}
        valueFile={params.row}
      />
    </>
  );
};
