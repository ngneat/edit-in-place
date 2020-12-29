import { InjectionToken } from '@angular/core';
import { TriggerEvents } from './editable.types';

export interface EditableConfig {
  openBindingEvent?: TriggerEvents;
  closeBindingEvent?: TriggerEvents;
}

export const DEFAULT_CONFIG: EditableConfig = {
  openBindingEvent: 'click',
  closeBindingEvent: 'click',
};

export const EDITABLE_CONFIG = new InjectionToken<EditableConfig>('editable.config', {
  factory() {
    return DEFAULT_CONFIG;
  },
});
