import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import DateFnsUtils from '@date-io/date-fns';
import { Form, Field } from 'react-final-form';
import { Select, TextField } from 'mui-rff';
import {
  Paper,
  Grid,
  Button,
  MenuItem,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';

import { workoutType } from 'types';

interface IErrors {
  distance?: string,
  comment?:string,
  type?:string,
  date?: string
}

function DatePickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <DatePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === '' ? null : value}
    />
  );
}

interface IProps {
    date?: number,
    comment?: string,
    distance?: number,
    type?: workoutType,
    submitButtonName: string,
    onSubmitForm: any
}


const WorkoutForm: React.FC<IProps> = ({comment = '', date, distance, type, onSubmitForm, submitButtonName}) => {
  const router = useRouter()
  const validate = values => {
    const errors: IErrors = {};
    if (!values.distance) {
      errors.distance = 'Required';
    }
    if (!values.type) {
      errors.type = 'Required';
    }
    if (!values.date) {
      errors.date = 'Required';
    }
    return errors;
  };

  return (
    <RegisterSection>
      <RegisterDiv>
      <Form
        onSubmit={onSubmitForm}
        initialValues={{ employed: true, date, type, distance, comment }}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={async event => {
            await handleSubmit(event);
            //form.reset();
            router.back();
            ;
          }} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={12}>
                    <Field
                      name="date"
                      component={DatePickerWrapper}
                      fullWidth
                      margin="normal"
                      label="Date"
                    />
                  </Grid>
                </MuiPickersUtilsProvider>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="distance"
                    type="number"
                    label="Distance"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="comment"
                    multiline
                    label="Comment"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Select
                    fullWidth
                    name="type"
                    label="Select a type of workout"
                    formControlProps={{ fullWidth: true }}
                  >
                    <MenuItem value={workoutType.CYCLE}>{workoutType.CYCLE}</MenuItem>
                    <MenuItem value={workoutType.RUN}>{workoutType.RUN}</MenuItem>
                    <MenuItem value={workoutType.SKI}>{workoutType.SKI}</MenuItem>
                    <MenuItem value={workoutType.WALK}>{workoutType.WALK}</MenuItem>
                  </Select>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => form.reset()}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitButtonName}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
       />
      </RegisterDiv>
    </RegisterSection>
  );
};

export default WorkoutForm;

const RegisterSection = styled.section`
  justify-content: center;
  align-items: flex-start;
  grid-template-columns: 1fr;
  margin: 3% auto;
  min-width: 500px;
  max-width: 900px;
`;

const RegisterDiv = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 70px;
  margin: auto 50px;
`;
