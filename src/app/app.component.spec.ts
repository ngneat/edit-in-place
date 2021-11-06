import { AppComponent } from './app.component';
import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { EDITABLE_CONFIG, EditableModule, DEFAULT_CONFIG } from '@ngneat/edit-in-place';
import { ReactiveFormsModule } from '@angular/forms';

describe('GIVEN AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [EditableModule, ReactiveFormsModule],
    providers: [{ provide: EDITABLE_CONFIG, useValue: DEFAULT_CONFIG }],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  describe('Sample input', () => {
    describe('WHEN INITIALIZING the component', () => {
      it('THEN should render the text content', () => {
        expect(spectator.query(byTestId('sample-input'))).toContainText('foo');
      });
    });
    describe('WHEN dblclicking on the text', () => {
      it('THEN should  render the input', () => {
        spectator.mouse.dblclick(byTestId('sample-input'));
        expect(spectator.query(byTestId('sample-input-edit'))).toBeVisible();
      });
    });

    describe('WHEN clicking outside the editable component', () => {
      it('should render the text content', () => {
        spectator.mouse.dblclick(byTestId('sample-input'));
        expect(spectator.query(byTestId('sample-input-edit'))).toBeVisible();
        spectator.click(byTestId('outside'));
        expect(spectator.query(byTestId('sample-input-edit'))).not.toBeVisible();
      });
    });

    describe('WHEN changing the input value', () => {
      it('THEN should update the viewMode content', () => {
        spectator.mouse.dblclick(byTestId('sample-input'));
        spectator.typeInElement('bar', byTestId('sample-input-edit'));
        spectator.click(byTestId('outside'));
        expect(spectator.query(byTestId('sample-input'))).toContainText('bar');
      });
    });

    describe('WHEN typing ENTER on the input', () => {
      it('THEN should update the value and display the viewMode content', () => {
        spectator.mouse.dblclick(byTestId('sample-input'));
        spectator.typeInElement('bar', byTestId('sample-input-edit'));
        spectator.keyboard.pressEnter(byTestId('sample-input-edit'));
        expect(spectator.query(byTestId('sample-input-edit'))).not.toBeVisible();
        expect(spectator.query(byTestId('sample-input'))).toContainText('bar');
      });
    });

    describe('WHEN typing ESCAPE on the input', () => {
      it('THEN should not update the viewMode content', () => {
        spectator.mouse.dblclick(byTestId('sample-input'));
        spectator.typeInElement('bar', byTestId('sample-input-edit'));
        spectator.keyboard.pressEscape(byTestId('sample-input-edit'));
        expect(spectator.query(byTestId('sample-input-edit'))).not.toBeVisible();
        expect(spectator.query(byTestId('sample-input'))).toContainText('foo');
      });
    });
  });

  describe('Sample input example triggered with single click', () => {
    describe('WHEN single clicking the viewMode content', () => {
      it('THEN should display the editMode content', () => {
        spectator.click(byTestId('sample-input-click'));
        expect(spectator.query(byTestId('sample-input-click-edit'))).toBeVisible();
      });
    });
  });

  describe('Sample input example triggered by hovering', () => {
    describe('WHEN hovering the viewMode content', () => {
      it('THEN should display the editMode content', () => {
        spectator.dispatchMouseEvent(byTestId('sample-input-hover'), 'mouseover');
        expect(spectator.query(byTestId('sample-input-hover-edit'))).toBeVisible();
      });
    });
  });

  describe('Sample input example (with focus)', () => {
    describe('WHEN dblclicking on the text', () => {
      it('THEN should display a focused input', () => {
        spectator.mouse.dblclick(byTestId('sample-input-focus'));
        expect(spectator.query(byTestId('sample-input-focus-edit'))).toBeVisible();
        expect(spectator.query(byTestId('sample-input-focus-edit'))).toBeFocused();
      });
    });
  });

  describe('Sample input example with action buttons', () => {
    describe('WHEN clicking on save button', () => {
      it('THEN should display the viewMode content and update its value', () => {
        spectator.mouse.dblclick(byTestId('sampleForm-btn'));
        spectator.typeInElement('bar', byTestId('sampleForm-btn-edit'));
        spectator.click(byTestId('sampleForm-save-btn'));
        expect(spectator.query(byTestId('sampleForm-btn-edit'))).not.toBeVisible();
        expect(spectator.query(byTestId('sampleForm-btn'))).toContainText('bar');
      });
    });

    describe('WHEN clicking on cancel button', () => {
      it('THEN should display the viewMode content and update its value', () => {
        spectator.mouse.dblclick(byTestId('sampleForm-btn'));
        spectator.typeInElement('bar', byTestId('sampleForm-btn-edit'));
        spectator.click(byTestId('sampleForm-cancel-btn'));
        expect(spectator.query(byTestId('sampleForm-btn-edit'))).not.toBeVisible();
        expect(spectator.query(byTestId('sampleForm-btn'))).toContainText('foo');
      });
    });
  });

  describe('Sample table example', () => {
    describe('WHEN clicking on the role', () => {
      it('THEN should display a select tag', () => {
        const editable = spectator.queryAll(byTestId('table-role'))[0];
        expect(editable).toContainText('Product Owner');
        spectator.click(editable);
        const select = editable.querySelector('select');
        expect(select).toBeVisible();
        spectator.selectOption(select, 'Developer');
        expect(select).toHaveSelectedOptions('Developer');
        spectator.click(byTestId('outside'));
        expect(select).not.toBeVisible();
        expect(spectator.queryAll(byTestId('table-role'))[0]).toContainText('Developer');
      });
    });

    describe('WHEN clicking on the isActive', () => {
      it('THEN should display a checkbox tag', () => {
        const editable = spectator.queryAll(byTestId('table-active'))[0];
        expect(editable).toContainText('false');
        spectator.click(editable);
        const checkbox = editable.querySelector('input');
        expect(checkbox).toBeVisible();
        expect(checkbox).toHaveProperty('checked', false);
        spectator.click(checkbox);
        expect(checkbox).toHaveProperty('checked', true);
        spectator.click(byTestId('outside'));
        expect(editable.querySelector('input[type="checkbox"]')).not.toBeVisible();
        expect(spectator.queryAll(byTestId('table-active'))[0]).toContainText('true');
      });
    });
  });

  describe('Sample select', () => {
    describe('WHEN selecting an option', () => {
      it('THEN should display it inside the viewMode', () => {
        spectator.mouse.dblclick(byTestId('sample-select'));
        expect(spectator.query(byTestId('sample-select-edit'))).toBeVisible();
        spectator.selectOption(byTestId('sample-select-edit'), 'Italy');
        expect(spectator.query(byTestId('sample-select-edit'))).toHaveSelectedOptions('Italy');
        spectator.click(byTestId('outside'));
        expect(spectator.query(byTestId('sample-select-edit'))).not.toBeVisible();
        expect(spectator.query(byTestId('sample-select'))).toContainText('Italy');
      });
    });
  });

  describe('Sample checkbox', () => {
    describe('WHEN checking the input', () => {
      it('THEN should change the value in the viewMode', () => {
        spectator.mouse.dblclick(byTestId('sample-checkbox'));
        expect(spectator.query(byTestId('sample-checkbox-edit'))).toBeVisible();
        expect(spectator.query(byTestId('sample-checkbox-edit'))).toHaveProperty('checked', true);
        spectator.click(spectator.query(byTestId('sample-checkbox-edit')));
        expect(spectator.query(byTestId('sample-checkbox-edit'))).toHaveProperty('checked', false);
        spectator.click(byTestId('outside'));
        expect(spectator.query(byTestId('sample-checkbox-edit'))).not.toBeVisible();
        expect(spectator.query(byTestId('sample-checkbox'))).toContainText('false');
      });
    });
  });

  describe('Sample range', () => {
    describe('WHEN changing the input value', () => {
      it('THEN should change the value in the viewMode', () => {
        expect(spectator.query(byTestId('sample-range'))).toContainText('8');
        spectator.mouse.dblclick(byTestId('sample-range'));
        expect(spectator.query(byTestId('sample-range-edit'))).toBeVisible();
        spectator.typeInElement('5', byTestId('sample-range-edit'));
        spectator.click(byTestId('outside'));
        expect(spectator.query(byTestId('sample-range-edit'))).not.toBeVisible();
        expect(spectator.query(byTestId('sample-range'))).toContainText('5');
      });
    });
  });

  describe('Multiple forms', () => {
    describe('WHEN clicking on the edit button', () => {
      it('THEN should display the form tags of the whole form', () => {
        expect(spectator.query(byTestId('groupedForm-edit-btn'))).toBeVisible();
        expect(spectator.query(byTestId('grouped-input-edit-1'))).not.toBeVisible();
        expect(spectator.query(byTestId('grouped-input-edit-2'))).not.toBeVisible();
        expect(spectator.query(byTestId('grouped-input-edit-3'))).not.toBeVisible();
        spectator.click(byTestId('groupedForm-edit-btn'));
        expect(spectator.query(byTestId('groupedForm-edit-btn'))).not.toBeVisible();
        expect(spectator.query(byTestId('groupedForm-save-btn'))).toBeVisible();
        expect(spectator.query(byTestId('groupedForm-cancel-btn'))).toBeVisible();
        expect(spectator.query(byTestId('grouped-input-edit-1'))).toBeVisible();
        expect(spectator.query(byTestId('grouped-input-edit-2'))).toBeVisible();
        expect(spectator.query(byTestId('grouped-input-edit-3'))).toBeVisible();
      });
    });

    describe('WHEN clicking on the save button', () => {
      it('THEN should display the edit button', () => {
        expect(spectator.query(byTestId('groupedForm-edit-btn'))).toBeVisible();
        spectator.click(byTestId('groupedForm-edit-btn'));
        expect(spectator.query(byTestId('groupedForm-edit-btn'))).not.toBeVisible();
        spectator.click(byTestId('groupedForm-save-btn'));
        expect(spectator.query(byTestId('groupedForm-edit-btn'))).toBeVisible();
      });
    });

    describe('WHEN clicking on the cancel button', () => {
      it('THEN should display the edit button', () => {
        expect(spectator.query(byTestId('groupedForm-edit-btn'))).toBeVisible();
        spectator.click(byTestId('groupedForm-edit-btn'));
        expect(spectator.query(byTestId('groupedForm-edit-btn'))).not.toBeVisible();
        spectator.click(byTestId('groupedForm-cancel-btn'));
        expect(spectator.query(byTestId('groupedForm-edit-btn'))).toBeVisible();
      });
    });

    describe('WHEN clicking on the cancel button', () => {
      it('THEN should hide the edit content', () => {
        spectator.click(byTestId('groupedForm-edit-btn'));
        spectator.click(byTestId('groupedForm-cancel-btn'));
        expect(spectator.query(byTestId('grouped-input-edit-1'))).not.toBeVisible();
        expect(spectator.query(byTestId('grouped-input-edit-2'))).not.toBeVisible();
        expect(spectator.query(byTestId('grouped-input-edit-3'))).not.toBeVisible();
        spectator.click(byTestId('groupedForm-edit-btn'));
      });
    });

    describe('WHEN saving the form', () => {
      it('THEN should update the displayed value', () => {
        expect(spectator.query(byTestId('groupedForm-edit-btn'))).toBeVisible();
        expect(spectator.query(byTestId('grouped-input-1'))).toContainText('John Doe');
        spectator.click(byTestId('groupedForm-edit-btn'));
        expect(spectator.query(byTestId('grouped-input-edit-1'))).toBeVisible();
        spectator.typeInElement('HellBoy', byTestId('grouped-input-edit-1'));
        spectator.click(byTestId('groupedForm-save-btn'));
        expect(spectator.query(byTestId('grouped-input-1'))).toContainText('HellBoy');
      });
    });
  });

  describe('Sample enable flag', () => {
    describe('IN ENABLE mode', () => {
      describe('WHEN INITIALIZING the component', () => {
        it('THEN should render the text content', () => {
          expect(spectator.query(byTestId('sample-enable-flag-check'))).toHaveProperty('checked', true);
          expect(spectator.query(byTestId('sample-enable-flag'))).toContainText('foo');
        });
      });
      describe('WHEN clicking on the text', () => {
        it('THEN should render the input', () => {
          expect(spectator.query(byTestId('sample-enable-flag-check'))).toHaveProperty('checked', true);
          spectator.click(byTestId('sample-enable-flag'));
          expect(spectator.query(byTestId('sample-enable-flag-edit'))).toBeVisible();
        });
      });
    });
    describe('IN DISABLE mode', () => {
      beforeEach(() => {
        spectator.click(byTestId('sample-enable-flag-check'));
      });

      describe('WHEN INITIALIZING the component', () => {
        it('THEN should render the text content', () => {
          expect(spectator.query(byTestId('sample-enable-flag-check'))).toHaveProperty('checked', false);
          expect(spectator.query(byTestId('sample-enable-flag'))).toContainText('foo');
        });
      });

      describe('WHEN clicking on the text', () => {
        it('THEN should NOT render the input', () => {
          expect(spectator.query(byTestId('sample-enable-flag-check'))).toHaveProperty('checked', false);
          spectator.click(byTestId('sample-enable-flag'));
          expect(spectator.query(byTestId('sample-enable-flag'))).toContainText('foo');
          expect(spectator.query(byTestId('sample-enable-flag-edit'))).not.toBeVisible();
        });
      });
    });
  });
});
