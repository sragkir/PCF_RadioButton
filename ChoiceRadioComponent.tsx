import * as React from 'react'; 
import { tokens, makeStyles, useId, RadioGroup, Radio, RadioGroupProps } from '@fluentui/react-components';

export interface IRadioGroupOption {
  label: string;
  value: number;
}

export interface IRadioChoiceProps extends RadioGroupProps {
  name?: string;
  options: IRadioGroupOption[];
  selectedKey: string;
}

const useStyles = makeStyles({
  field: {
    display: "grid",
    gridRowGap: tokens.spacingVerticalL,
  },
});

export const RadioChoiceTypes: React.FC<IRadioChoiceProps> = ({ options, selectedKey, ...radioGroupProps }) => {
  const styles = useStyles();
  const labelId = useId("label");
  const [selectedValue, setSelectedValue] = React.useState<string>(selectedKey);

  React.useEffect(() => {
    setSelectedValue(selectedKey);
  }, [selectedKey]);

  const handleChange = (ev: React.FormEvent<HTMLElement>, data: { value: string }) => {
    setSelectedValue(data.value);
    console.log("Selected value:", data.value); // This will log the selected value
  };

  return (
    <div className={styles.field}>
      <RadioGroup
        {...radioGroupProps}
        aria-labelledby={labelId}
        layout="horizontal"
        value={selectedValue}
        onChange={handleChange}
      >
        {options.map((option) => (
          <Radio key={option.value} value={option.value.toString()} label={option.label} />
        ))}
      </RadioGroup>
    </div>
  );
};
