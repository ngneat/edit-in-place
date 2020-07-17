import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { EditableComponent } from './editable.component';

describe('EditableComponent', () => {
  let spectator: Spectator<EditableComponent>;
  const createComponent = createComponentFactory(EditableComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
