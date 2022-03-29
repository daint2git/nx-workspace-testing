import {
  AllSetsDocument,
  AllSetsQuery,
  useAddSetMutation,
} from '@nx-workspace-testing/data-access';
import styled from 'styled-components';
import {
  useForm,
  SubmitHandler,
  Path,
  UseFormRegister,
  FieldError,
} from 'react-hook-form';
import { forwardRef } from 'react';

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
}

interface InputProps {
  label: string;
  name: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required?: boolean;
  maxLength?: number;
  error?: FieldError;
}

// The following component is an example of your existing Input Component
const Input = ({
  label,
  name,
  register,
  required,
  maxLength,
  error,
}: InputProps) => (
  <label htmlFor={name}>
    {label}
    <input id={name} {...register(name, { required, maxLength })} />
    {error && <span style={{ color: 'red' }}>error</span>}
  </label>
);

// you can use React.forwardRef to pass the ref too
const Select = forwardRef<
  HTMLSelectElement,
  {
    label: string;
    options: { label: string; value: string }[];
  } & ReturnType<UseFormRegister<IFormValues>>
>(({ label, options, name, onChange, onBlur }, ref) => (
  <label htmlFor={name}>
    {label}
    <select id={name} name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
));

function SetForm(props: SetFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      name: '',
      year: null,
      numParts: 1000,
    },
  });

  console.log(watch('name')); // watch input value by passing the name of it
  // console.log(watch('year')); // watch input value by passing the name of it
  // console.log(watch('numParts')); // watch input value by passing the name of it

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
    // onCompleted() {},
  });

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

  return (
    <StyledSetForm>
      {/* "handleSubmit" will validate your inputs before invoking "submit" */}
      <form aria-label="set-form" onSubmit={handleSubmit(submit)}>
        {/* <label htmlFor="name">
          Name: */}
        {/* register your input into the hook by invoking the "register" function */}
        {/* <input
            id="name"
            {...register('name', {
              required: true,
              maxLength: 6,
            })}
          />
          {errors.name && <span style={{ color: 'red' }}>error</span>}
        </label> */}
        <Input
          label="Name:"
          name="name"
          register={register}
          required
          error={errors.name}
        />
        <br />
        <label htmlFor="year">
          Year:
          {/* include validation with required or other standard HTML validation rules */}
          <input
            id="year"
            {...register('year', {
              minLength: 4,
              maxLength: 4,
              pattern: /^\d+$/,
            })}
          />
          {errors.year && <span style={{ color: 'red' }}>error</span>}
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
          {errors.numParts && <span style={{ color: 'red' }}>error</span>}
        </label>
        <br />
        {/* <label htmlFor="color">
          Color:
          <select id="color" {...register('color')}>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </select>
        </label> */}
        <Select
          label="Color:"
          options={[
            { value: 'red', label: 'Red' },
            { value: 'green', label: 'Green' },
            { value: 'blue', label: 'Blue' },
          ]}
          {...register('color')}
        />
        <div />
        <br />
        <button type="submit">Create new set</button>
      </form>
    </StyledSetForm>
  );
}

export default SetForm;
