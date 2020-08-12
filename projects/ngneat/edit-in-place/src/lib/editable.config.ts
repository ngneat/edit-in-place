import { InjectionToken } from '@angular/core';

export interface EditableConfig {
  openBindingEvent: string;
  closeBindingEvent: string;
}

export const EDITABLE_CONFIG = new InjectionToken<EditableConfig>('editable.config');
