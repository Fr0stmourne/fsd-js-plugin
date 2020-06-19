/* eslint-disable @typescript-eslint/no-use-before-define */
import { Options } from '../../components/plugin/types';

const testOptions = {
  default: {
    minValue: -33,
    maxValue: 103,
    step: 1,
    value: 72,
    scaleOptionsNum: 9,
  },
  vr: {
    minValue: -112,
    maxValue: 100,
    step: 8,
    value: [-56, 56],
    isVertical: true,
    scaleOptionsNum: 5,
  },
  r: {
    minValue: -33,
    maxValue: 100,
    step: 2,
    value: [29, 79],
    scaleOptionsNum: 5,
  },
  v: {
    minValue: 0,
    maxValue: 100,
    step: 7,
    value: 49,
    isVertical: true,
    scaleOptionsNum: 5,
  },
};

$('.js-example-default').slider(testOptions.default);
$('.js-example-vr').slider(testOptions.vr);
$('.js-example-r').slider(testOptions.r);
$('.js-example-v').slider(testOptions.v);

type OptionsWithoutSize = Omit<Options, 'sliderSize'>;

function createPanel(el: HTMLElement, initialOptions: Required<OptionsWithoutSize>): void {
  const element = el;

  const inputs = {
    isTooltipDisabled: element.querySelector('.js-tooltip-checkbox') as HTMLInputElement,
    step: element.querySelector('.js-step') as HTMLInputElement,
    minValue: element.querySelector('.js-min-value') as HTMLInputElement,
    maxValue: element.querySelector('.js-max-value') as HTMLInputElement,
    scaleOptionsNum: element.querySelector('.js-scale') as HTMLInputElement,
    value: element.querySelector('.js-control-input') as HTMLInputElement,
    isVertical: element.querySelector('.js-direction') as HTMLInputElement,
  };

  function setInitialInputValues(initialOptions: Required<OptionsWithoutSize>): void {
    inputs.isTooltipDisabled.checked = initialOptions.isTooltipDisabled;
    inputs.isVertical.checked = initialOptions.isVertical;
    inputs.step.value = String(initialOptions.step);
    inputs.minValue.value = String(initialOptions.minValue);
    inputs.maxValue.value = String(initialOptions.maxValue);
    inputs.scaleOptionsNum.value = String(initialOptions.scaleOptionsNum);
    inputs.value.value = String(initialOptions.value);
  }

  const slider = element.closest('.js-test')?.querySelector('.js-example') as HTMLElement;
  setInitialInputValues(initialOptions);

  function handlePanelChange(): void {
    const newOptions = getInputsState();
    $(slider).slider('update', newOptions);
    bindListeners(inputs);
  }

  function bindListeners(inputs: any): void {
    Object.values(inputs).forEach(input => {
      (input as HTMLInputElement).addEventListener('change', handlePanelChange);
    });
    function updateInputValue(value: number | number[]): void {
      inputs.value.value = value;
    }

    $(slider).slider('onValueChange', updateInputValue);
  }

  function getInputsState(): Options {
    return {
      isTooltipDisabled: inputs.isTooltipDisabled.checked,
      step: Number(inputs.step.value),
      minValue: inputs.minValue.value !== '' ? Number(inputs.minValue.value) : undefined,
      maxValue: inputs.maxValue.value !== '' ? Number(inputs.maxValue.value) : undefined,
      scaleOptionsNum: inputs.scaleOptionsNum.value !== '' ? Number(inputs.scaleOptionsNum.value) : undefined,
      isVertical: inputs.isVertical.checked,
      value: inputs.value.value.includes(',')
        ? inputs.value.value.split(',').map(el => Number(el))
        : Number(inputs.value.value),
    };
  }

  bindListeners(inputs);
}

Object.values(testOptions).forEach((options, index) => {
  const panels = document.querySelectorAll('.js-control-panel');
  createPanel(panels[index] as HTMLElement, options as any);
});
