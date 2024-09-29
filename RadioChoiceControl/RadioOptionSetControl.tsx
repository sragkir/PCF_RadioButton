import { Radio, RadioGroup, RadioGroupOnChangeData } from "@fluentui/react-components";
import { FluentProvider, teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme, Theme, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import * as React from "react";

export interface IRadioOptionSetProps {
  choices: ComponentFramework.PropertyHelper.OptionMetadata[] | undefined;
  selected: number | null;
  notifyChange(selectedOptionsOut: number | null): void;
  theme: string;
  isDisabled: boolean;
  isMasked: boolean;
  mode: "vertical" | "horizontal" | undefined;
}

const fluentThemes: Record<string, Theme> = {
  teamsLightTheme: teamsLightTheme,
  teamsDarkTheme: teamsDarkTheme,
  teamsHighContrastTheme: teamsHighContrastTheme,
  webLightTheme: webLightTheme,
  webDarkTheme: webDarkTheme,
};

export const RadioOptionSetControl = React.memo(({ choices, selected, notifyChange, theme, isDisabled, isMasked, mode }: IRadioOptionSetProps) => {
  if (!choices || isMasked) return <></>;

  const onOptionSelect = React.useCallback((event: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData) => {
    const selectedValue = parseInt(data.value);
    notifyChange(selectedValue);
  }, [notifyChange]);

  return (
    <FluentProvider theme={fluentThemes[theme]}>
      <RadioGroup 
        value={selected !== null ? String(selected) : ""} // Ensure it's always a string
        layout= { mode !== undefined ? mode : "horizontal"}
        onChange={onOptionSelect} 
        disabled={isDisabled}
      >
        {choices.map((choice) => (
          <Radio 
            key={choice.Value}
            value={choice.Value.toString()}
            label={choice.Label}
          />
        ))}
      </RadioGroup>
    </FluentProvider>
  );
});
