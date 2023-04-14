import { Grid } from "@mui/material";
import TextFieldOutlined from "../../../components/common/TextFieldOutline";

function DoubleInput({
  label1,
  type1,
  value1,
  setValue1,
  required1,
  disabled1,
  event1,
  readOnly1,
  iconStart1,
  iconEnd1,
  defaultValue1,
  name1,
  label2,
  type2,
  value2,
  setValue2,
  required2,
  disabled2,
  event2,
  readOnly2,
  iconStart2,
  iconEnd2,
  defaultValue2,
  name2,
}: any) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <TextFieldOutlined
          label={label1}
          type={type1}
          value={value1}
          setValue={setValue1}
          required={required1}
          disabled={disabled1}
          event={event1}
          readOnly={readOnly1}
          iconStart={iconStart1}
          iconEnd={iconEnd1}
          defaultValue={defaultValue1}
          name={name1}
        />
      </Grid>
      <Grid item xs={8}>
        <TextFieldOutlined
          label={label2}
          type={type2}
          value={value2}
          setValue={setValue2}
          required={required2}
          disabled={disabled2}
          event={event2}
          readOnly={readOnly2}
          iconStart={iconStart2}
          iconEnd={iconEnd2}
          defaultValue={defaultValue2}
          name={name2}
        />
      </Grid>
    </Grid>
  );
}

export default DoubleInput;
