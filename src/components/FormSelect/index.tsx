import Select from 'react-select';

const FormSelect = (props: any) => {
  const {
    className,
    validation,
    invalid = 'false',
    dirty = 'false',
    onTurnDirty,
    ...selectProps
  } = props;

  function handleBlur() {
    onTurnDirty(props.name);
  }

  return (
    <div data-invalid={invalid} data-dirty={dirty} className={className}>
      <Select {...selectProps} onBlur={handleBlur} {...selectProps} />
    </div>
  );
};

export default FormSelect;
