import { Grid, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { CustomButton } from "../../common/customButton/CustomButton";
import { ChangeEvent, FormEvent, useState } from "react";
import { displayAlert } from "../../../utils/toastMessage";
import {
  formInitialData,
  handleCourseSwitch,
  handleDOBSwitch,
  handleEducationalSwitch,
  handleEmailSwitch,
  handleNameSwitch,
  handlePhoneSwitch,
  handleStudentIdSwitch,
  handleStudyYear,
} from "./formUtils";
import { qrFormStyles } from "./QrCodeStyles";
interface IState {
  inputs: {
    fieldName: string;
    value: string;
    errorMessage: string;
    placeholder: string;
  }[];
}
interface IState {
  inputs: {
    fieldName: string;
    value: string;
    errorMessage: string;
    placeholder: string;
  }[];
  isVisible: boolean;
  changeEvent:
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | SelectChangeEvent;
}
const QrForm = () => {
  const [inputs, setInputs] = useState<IState["inputs"]>(formInitialData);
  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newErrors = [...inputs];
    const conditionFunctions = [
      handleNameSwitch,
      handleStudentIdSwitch,
      handleEmailSwitch,
      handlePhoneSwitch,
      handleDOBSwitch,
      handleEducationalSwitch,
      handleCourseSwitch,
      handleStudyYear,
    ];
    inputs.forEach(
      (input, index) =>
        (newErrors[index].errorMessage = conditionFunctions[index](input.value))
    );
    const isAnyOneFieldEmpty = newErrors
      .map((input) => input.errorMessage)
      .every((errorMessage) => errorMessage.length === 0);
    if (!isAnyOneFieldEmpty) {
      setInputs(newErrors);
    } else {
      displayAlert("Request sent successfully");
    }
  };
  const handleOnChange = (event: IState["changeEvent"], index: number) => {
    event.preventDefault();
    const newInputs = [...inputs];
    const obj = newInputs[index];
    newInputs[index] = { ...obj, value: event.target.value };
    setInputs(newInputs);
  };
  const handleOnBlur = (event: { target: { name: string } }) => {
    const newErrors = [...inputs];
    const conditionFunctions = [
      handleNameSwitch,
      handleStudentIdSwitch,
      handleEmailSwitch,
      handlePhoneSwitch,
      handleDOBSwitch,
      handleEducationalSwitch,
      handleCourseSwitch,
      handleStudyYear,
    ];
    inputs.forEach((input, index) => {
      if (input.fieldName === event.target.name) {
        return (newErrors[index].errorMessage = conditionFunctions[index](
          input.value
        ));
      }
    });
    setInputs(newErrors);
  };
  const handleType = (fieldName: string) => {
    switch (fieldName) {
      case "fullName":
        return "text";
      case "studentId":
        return "text";
      case "emailAddress":
        return "text";
      case "phoneNumber":
        return "number";
      case "educationalInstitution":
        return "text";
      case "course/Major":
        return "text";
      case "yearOfStudy":
        return "number";
      case "dateOfBirth":
        return "date";
    }
  };
  return (
    <Grid
      component={"form"}
      onSubmit={handleOnSubmit}
      container
      justifyContent={"center"}
      alignItems={"center"}
      spacing={2}
      sx={qrFormStyles.form}
    >
      <Grid item xs={12}>
        <Typography sx={qrFormStyles.fillText}>Fill Details</Typography>
      </Grid>
      {inputs.map((input, index) => (
        <Grid item xs={12} md={6} xl={6}>
          <TextField
            key={index}
            fullWidth
            type={handleType(input.fieldName)}
            placeholder={input.placeholder}
            name={input.fieldName}
            value={input.value}
            error={Boolean(input.errorMessage)}
            helperText={
              <Typography sx={qrFormStyles.helperText}>
                {input.errorMessage}
              </Typography>
            }
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(event, index)
            }
            onBlur={handleOnBlur}
          />
        </Grid>
      ))}
      <Grid
        item
        xs={12}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <CustomButton type="submit" width={202}>
          Submit
        </CustomButton>
      </Grid>
    </Grid>
  );
};

export default QrForm;
