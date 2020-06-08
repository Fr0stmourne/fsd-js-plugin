/* eslint-disable @typescript-eslint/no-use-before-define */
import { Options } from '../../components/plugin/interfaces';
import '../../components/plugin/index';

const testOptions = {
  default: {
    minValue: -33,
    maxValue: 103,
    step: 5,
    value: 75,
    scaleOptionsNum: 6,
  },
  vr: {
    minValue: -101,
    maxValue: 100,
    step: 8,
    value: [-50, 50],
    isVertical: true,
    scaleOptionsNum: 5,
  },
  r: {
    minValue: -33,
    maxValue: 100,
    step: 2,
    value: [30, 80],
    scaleOptionsNum: 5,
  },
  v: {
    minValue: 0,
    maxValue: 100,
    step: 7,
    value: 45,
    isVertical: true,
    scaleOptionsNum: 5,
  },
};

$('.js-example-default').slider(testOptions.default);
$('.js-example-vr').slider(testOptions.vr);
$('.js-example-r').slider(testOptions.r);
$('.js-example-v').slider(testOptions.v);

function createPanel(el: HTMLElement, initialOptions: Options): void {
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
  console.log(inputs);

  function setInitialInputValues(initialOptions: Options): void {
    inputs.isTooltipDisabled.checked = initialOptions.isTooltipDisabled;
    inputs.step.value = String(initialOptions.step);
    inputs.minValue.value = String(initialOptions.minValue);
    inputs.maxValue.value = String(initialOptions.maxValue);
    inputs.scaleOptionsNum.value = String(initialOptions.scaleOptionsNum);
    inputs.value.value = String(initialOptions.value);
  }

  setInitialInputValues(initialOptions);

  function handlePanelChange(e: Event) {
    const newOptions = getInputsState();
    const slider = element.closest('.js-test').querySelector('.js-example');

    $(slider).slider('update', newOptions);
    bindListeners(inputs);
  }

  function bindListeners(inputs: object) {
    Object.values(inputs).forEach(input => {
      (input as HTMLInputElement).addEventListener('change', handlePanelChange);
    });
  }

  function getInputsState(): Options {
    return {
      isTooltipDisabled: inputs.isTooltipDisabled.checked,
      step: +inputs.step.value,
      minValue: inputs.minValue.value !== '' ? +inputs.minValue.value : undefined,
      maxValue: inputs.maxValue.value !== '' ? +inputs.maxValue.value : undefined,
      scaleOptionsNum: inputs.scaleOptionsNum.value !== '' ? +inputs.scaleOptionsNum.value : undefined,
      isVertical: inputs.isVertical.checked,
    };
  }

  bindListeners(inputs);
}

Object.values(testOptions).forEach((options, index) => {
  const panels = document.querySelectorAll('.js-control-panel');
  createPanel(panels[index] as HTMLElement, options);
});

setTimeout(() => {
  // $('.js-example-default').slider('update', { isTooltipDisabled: true });
  // .slider('update', { isVertical: true });
  // $('.js-example').slider('updateValue', 20);
  // $('.js-example-default').slider('update', {
  //   ...testOptionsVerticalRange,
  //   ...{
  //     minValue: -205,
  //     maxValue: 210,
  //     value: [-190, 190],
  //   },
  // });
  // console.log($('.js-example').slider('getValue'));
}, 2000);
