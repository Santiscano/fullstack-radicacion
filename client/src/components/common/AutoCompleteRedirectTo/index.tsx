// @ts-nocheck
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function AutoCompleteRedirectTo({
  value,
  setValue,
  listUsers,
  // required,
  // disabled,
  // readOnly,
  // selected = [],
  label,
}) {
  // const [users, setUsers] = useState([]);

  return (
    <Autocomplete
      disablePortal
      filterSelectedOptions
      // disabled={disabled}
      // readOnly={readOnly}
      value={value}
      onChange={(e, newValue) => setValue(newValue)}
      options={listUsers.map(
        (user) =>
          `${user.users_name} - ${user.users_lastname}`
      )}
      getOptionLabel={(user) => user.users_identification}
      // getOptionDisabled={(user) => user === value}
      // isOptionEqualToValue={(user, value) => user === value}
      itemID={"idusers"}
      renderInput={(params) => (
        <TextField
          {...params}
          label={!label ? "Usuarios" : label}
          color={"blue"}
          variant={"filled"}
          // required={required}
          InputProps={{
            ...params.InputProps,
            autoComplete: "on",
          }}
        />
      )}
    />
  );
}

export default AutoCompleteRedirectTo;
