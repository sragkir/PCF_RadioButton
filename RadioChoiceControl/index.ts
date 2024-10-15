import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { IRadioOptionSetProps, RadioOptionSetControl } from "./RadioOptionSetControl";
import { createRoot, Root } from 'react-dom/client';

export class RadioOptionSet implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  /**
   * Empty constructor.
   */
  constructor() { }

  private contextObj: ComponentFramework.Context<IInputs>;
  private containerObj: HTMLDivElement;
  private selected: number | null;
  private root: Root | null = null;
  private outputChanged: () => void;
  private lockField: boolean = false;
  private isFirstTimeLoad: boolean = false;

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
    this.contextObj = context;
    this.containerObj = container;
    this.outputChanged = notifyOutputChanged;
    this.onChange = this.onChange.bind(this);

    if (this.contextObj.parameters.lockField.raw.toLowerCase() === "true" && this.contextObj.parameters.OptionsetColumn.raw !== null) {
      this.lockField = true;
    }
    this.isFirstTimeLoad = true;
  }
  protected onChange = (selectedOptionsOut: number | null) => {
    this.selected = selectedOptionsOut;
    this.outputChanged();
  };

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this.contextObj = context;
    let displayMode = "horizontal";
    if (this.contextObj.parameters.displayMode.raw !== null) {
      displayMode = this.contextObj.parameters.displayMode.raw!
    }
    // @ts-ignore
    let isLoading: boolean = context.parameters.OptionsetColumn.isPropertyLoading;

    if (isLoading) {
      console.log("OptionsetColumn ", this.lockField, context.parameters.OptionsetColumn);
    } else {
      if (this.isFirstTimeLoad) {
        this.isFirstTimeLoad = false;
        if (this.contextObj.parameters.lockField.raw.toLowerCase() === "true" && this.contextObj.parameters.OptionsetColumn.raw !== null) {
          this.lockField = true;
        }
      }
    }

    if (!this.root) {
      this.root = createRoot(this.containerObj);
    }

    if (!isLoading) {
      this.root.render(
        React.createElement(RadioOptionSetControl, {
          choices: this.contextObj.parameters.OptionsetColumn.attributes?.Options,
          selected: this.contextObj.parameters.OptionsetColumn.raw,
          isMasked: false,
          isDisabled: this.lockField,
          notifyChange: this.onChange,
          theme: "webLightTheme",
          mode: displayMode,
        } as IRadioOptionSetProps)
      );
    }
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return { OptionsetColumn: this.selected === null ? undefined : this.selected };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
    if (this.root) {
      this.root.unmount();
    }
  }
}