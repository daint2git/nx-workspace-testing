import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import {
  AllSetsDocument,
  AllSetsQuery,
  useAddSetMutation,
} from '@nx-workspace-testing/data-access';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';

/* eslint-disable-next-line */
export interface SetFormProps {}

const StyledSetForm = styled.div`
  form {
    font-family: sans-serif;
    border: solid 1px #eee;
    max-width: 240px;
    padding: 24px;
  }

  input {
    display: block;
    margin-bottom: 8px;
    border: 1px solid gray;
  }
`;

enum ColorEnum {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

interface IFormValues {
  name: string;
  year: number | null;
  numParts: number;
  color: ColorEnum;
  subName: string;
}

const schema = yup
  .object({
    name: yup.string().required('The name is required.'),
    year: yup
      .number()
      .required('The year is required.')
      .typeError('The year must be a number.')
      .integer('The year is an integer number.'),
    numParts: yup
      .number()
      .typeError('The numParts must be a number.')
      .integer('The numParts is an integer number.')
      .required('The numParts is required.'),
  })
  .required();

function SetForm(props: SetFormProps) {
  const {
    control,
    register,
    unregister,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormValues>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      year: null,
      numParts: 1000,
      color: ColorEnum.Red,
    },
    // resolver: yupResolver(schema),
    resolver: async (data, context, options) => {
      // you can debug your validation schema here

      // console.log('resolver::data', data);
      // console.log('resolver::context', context);
      // console.log('resolver::options', options);
      // console.log(
      //   'resolver::validation result',
      //   await yupResolver(schema)(data, context, options)
      // );
      return yupResolver(schema)(data, context, options);
    },
  });

  const [addSetMutation] = useAddSetMutation({
    update(cache, { data }) {
      if (!data?.addSet) return;

      const existing = cache.readQuery<AllSetsQuery>({
        query: AllSetsDocument,
      });

      if (!existing) return;

      cache.writeQuery({
        query: AllSetsDocument,
        data: {
          allSets: existing.allSets?.concat(data.addSet),
        },
      });
    },
    onCompleted() {
      reset();
    },
  });

  useEffect(() => {
    register('subName');
  }, [register]);

  const submit: SubmitHandler<IFormValues> = async (data) => {
    console.log('submit::data', data);

    await addSetMutation({
      variables: {
        name: data.name,
        year: +data.year!,
        numParts: data.numParts,
      },
    });
  };

  // console.log('isSubmitting', isSubmitting);

  return (
    <StyledSetForm>
      {/* "handleSubmit" will validate your inputs before invoking "submit" */}
      <form aria-label="set-form" onSubmit={handleSubmit(submit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="name"
              error={!!errors.name}
              helperText={errors.name?.message}
              label="Name:"
              variant="outlined"
              {...field}
            />
          )}
        />
        <br />
        <label htmlFor="year">
          Year:
          {/* include validation with required or other standard HTML validation rules */}
          <input
            id="year"
            {...register('year', {
              minLength: {
                value: 4,
                message: 'minLength = 4',
              },
              // maxLength: 4,
              maxLength: {
                value: 4,
                message: 'maxLength = 4',
              },
              pattern: /^\d+$/,
            })}
          />
          {errors.year && (
            <span style={{ color: 'red' }}>
              <span>{errors.year.message}</span>
            </span>
          )}
        </label>
        <br />
        <label htmlFor="numParts">
          Number of Parts:
          <input
            id="numParts"
            {...register('numParts', {
              valueAsNumber: true,
              pattern: /^\d+$/,
            })}
          />
          {errors.numParts && (
            <span style={{ color: 'red' }}>
              <span>{errors.numParts.message}</span>
            </span>
          )}
        </label>
        <br />
        <label htmlFor="subName">
          Sub name:
          <input
            id="subName"
            onChange={(e) => setValue('subName', e.target.value)}
          />
        </label>
        <div />
        <br />
        <Button
          type="button"
          variant="outlined"
          onClick={() => unregister('subName')}
        >
          unregister subName
        </Button>
        <div />
        <br />
        <FormControl fullWidth>
          <InputLabel id="color-id">Color:</InputLabel>
          <Controller
            name="color"
            control={control}
            render={({ field }) => {
              return (
                <Select labelId="color-id" id="color" label="Color" {...field}>
                  {[
                    { value: 'red', label: 'Red' },
                    { value: 'green', label: 'Green' },
                    { value: 'blue', label: 'Blue' },
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
          />
        </FormControl>
        <div />
        <br />
        <Button disabled={isSubmitting} type="submit" variant="contained">
          Create new set
        </Button>
      </form>
    </StyledSetForm>
  );
}

export default SetForm;
