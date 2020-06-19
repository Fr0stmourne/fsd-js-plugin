import BarView from './View/components/BarView';
import PinView from './View/components/PinView';
import InputView from './View/components/InputView';
import ScaleView from './View/components/ScaleView';

type Options = ViewState & ModelState;

type ViewState = {
  scaleOptionsNum?: number;
  isTooltipDisabled?: boolean;
  isVertical?: boolean;
  sliderSize?: DOMRect;
};

type EventCallback = (data: any) => void;

type Events = {
  [key in EventTypes]?: EventCallback[];
};

type ModelState = {
  minValue?: number;
  maxValue?: number;
  step?: number;
  value?: number | number[];
  range?: boolean;
};

type PinData = {
  pinNumber: number;
  isTooltipDisabled: boolean;
  isVertical: boolean;
  value: number;
};

type ScaleData = {
  scaleOptionsNum: number;
  step: number;
  isVertical: boolean;
  minValue: number;
  maxValue: number;
  sliderSize?: number;
};

type BarData = {
  minValue: number;
  maxValue: number;
  isVertical: boolean;
};

type Objects = {
  bar: BarView;
  firstPin: PinView;
  secondPin?: PinView;
  input: InputView;
  scale?: ScaleView;
};

type MouseMoveData = {
  pin: PinView;
  shift: number;
};

enum EventTypes {
  ValueChanged = 'ValueChanged',
  StateChanged = 'StateChanged',
  NewScaleValue = 'NewScaleValue',
  NewBarValue = 'NewBarValue',
}

export {
  Options,
  ViewState,
  EventCallback,
  Events,
  ModelState,
  PinData,
  ScaleData,
  BarData,
  Objects,
  MouseMoveData,
  EventTypes,
};
