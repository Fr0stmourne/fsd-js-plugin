import { boundMethod } from 'autobind-decorator';

import { DEFAULT_MODEL_STATE } from 'defaults';
import { ModelState, EventTypes } from 'types';

import Observer from '../Observer';
import calculateSteps from './utils/calculateSteps';

class Model extends Observer {
  constructor(private state: ModelState = DEFAULT_MODEL_STATE) {
    super();
    this.init(state);
  }

  getState(): ModelState {
    const { state } = this;
    return { ...state };
  }

  setState(modelState: Partial<ModelState>): void {
    this.state = this.validateState(modelState);
    const { minValue, maxValue, step } = this.getState();
    this.state.steps = calculateSteps({ minValue, maxValue, step });
    this.emit(EventTypes.StateChanged, { value: this.getState().value });
  }

  init(state: ModelState): void {
    this.state = { ...DEFAULT_MODEL_STATE, ...state };

    const { minValue, maxValue, step } = this.getState();
    this.state.steps = calculateSteps({ minValue, maxValue, step });
  }

  private findClosestStep(value: number): number {
    return this.state.steps.reduce((a, b) => (Math.abs(b - value) < Math.abs(a - value) ? b : a));
  }

  @boundMethod
  private calculateValidatedValue({
    maxValue,
    minValue,
    step,
    firstValue,
    secondValue,
    newValue,
    prevValue,
  }: {
    maxValue: number;
    minValue: number;
    step: number;
    firstValue: number;
    secondValue: number;
    newValue: number[];
    prevValue: number[];
  }): number[] {
    const {
      state: { steps },
    } = this;

    if (Math.abs(maxValue - minValue) === step) return [steps[0], steps[1]];
    if (firstValue === secondValue && firstValue === maxValue)
      return [steps[steps.length - 2], steps[steps.length - 1]];
    if (newValue.every((value: number) => value < minValue || value > maxValue)) return [steps[0], steps[1]];
    return prevValue[0] !== newValue[0]
      ? [steps[steps.indexOf(secondValue) - 1], secondValue]
      : [firstValue, steps[steps.indexOf(firstValue) + 1]];
  }

  private validateValue(state: ModelState, newValue?: number[]): number[] {
    if (newValue === undefined) return this.state.value;
    let validatedValue: number[];

    const { value: prevValue, range, maxValue, minValue, step } = state;
    const { calculateValidatedValue } = this;
    const firstValue = this.findClosestStep(newValue[0]);
    let secondValue: number;
    if (newValue.length === 2) {
      secondValue = this.findClosestStep(newValue[1]);
    } else {
      secondValue = prevValue[1] ? Math.max(maxValue, prevValue[1]) : maxValue;
    }
    validatedValue = [firstValue, secondValue];

    if (state.range || range) {
      if (firstValue >= secondValue) {
        validatedValue = calculateValidatedValue({
          maxValue,
          minValue,
          step,
          firstValue,
          secondValue,
          newValue,
          prevValue,
        });
      }
    } else {
      if (firstValue > secondValue) {
        validatedValue = calculateValidatedValue({
          maxValue,
          minValue,
          step,
          firstValue,
          secondValue,
          newValue,
          prevValue,
        });
      }
    }

    return validatedValue;
  }

  private validateMinMaxValues(minValue?: number, maxValue?: number): { minValue: number; maxValue: number } {
    if (minValue === undefined || maxValue === undefined) {
      return {
        minValue: this.state.minValue,
        maxValue: this.state.maxValue,
      };
    }
    if (minValue === maxValue)
      return {
        minValue,
        maxValue: minValue + 1,
      };
    return minValue > maxValue
      ? {
          minValue: maxValue,
          maxValue: minValue,
        }
      : {
          minValue,
          maxValue,
        };
  }

  private validateStep(step?: number): number {
    const { minValue, maxValue } = this.state;
    if (step === undefined) return this.state.step;
    if (step > Math.abs(maxValue - minValue)) {
      return Math.abs(maxValue - minValue);
    }
    return Math.abs(step) || 1;
  }

  private validateRange(range?: boolean): boolean {
    const { range: prevRange } = this.state;
    if (range === undefined) return prevRange;
    return range === true;
  }

  private validateState(newState: Partial<ModelState>): ModelState {
    const stateToValidate = { ...newState };

    const validatedStep = this.validateStep(stateToValidate.step);
    const validatedMinMaxValues = this.validateMinMaxValues(stateToValidate.minValue, stateToValidate.maxValue);
    this.state.steps = calculateSteps({
      minValue: validatedMinMaxValues.minValue,
      maxValue: validatedMinMaxValues.maxValue,
      step: validatedStep,
    });

    const validatedValue = this.validateValue(
      {
        ...this.state,
        step: validatedStep,
        ...validatedMinMaxValues,
        range: this.validateRange(stateToValidate.range),
      },
      stateToValidate.value,
    );

    const validatedState = {
      ...this.state,
      step: validatedStep,
      ...validatedMinMaxValues,
      value: validatedValue,
      range: this.validateRange(stateToValidate.range),
    };

    return validatedState;
  }
}

export default Model;
