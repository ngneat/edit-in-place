import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

interface Account {
  name: string;
  role: string;
  isActive: boolean;
}

type Accounts = Array<Account>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public openBindingEvent = 'dblclick';

  // Sample input example
  public inputText = 'foo';
  public inputControl: UntypedFormControl = new UntypedFormControl(this.inputText);

  // Sample input example with focus
  public inputFocusText = 'foo';
  public inputFocusControl: UntypedFormControl = new UntypedFormControl(this.inputFocusText);

  // Sample input example with action buttons
  public inputButtonsText = 'foo';
  public inputButtonsControl: UntypedFormControl = new UntypedFormControl(this.inputButtonsText);

  // Sample select example
  public selectText = 'Canada';
  public selectControl: UntypedFormControl = new UntypedFormControl(this.selectText);
  public selectOptions = ['Belgium', 'Italy', 'Canada'];

  // Sample checkbox example
  public checkboxText = true;
  public checkboxControl: UntypedFormControl = new UntypedFormControl(this.checkboxText);

  // Sample range example
  public rangeText = 8;
  public rangeControl: UntypedFormControl = new UntypedFormControl(this.rangeText);

  // Sample radio example
  public radioText = 'blue';
  public radioControl: UntypedFormControl = new UntypedFormControl(this.radioText);
  public radioOptions = ['blue', 'green'];

  // Sample table example
  public formArray: UntypedFormArray;
  public accounts: Accounts = [
    { name: 'John', role: 'Product Owner', isActive: false },
    { name: 'Sarah', role: 'Developer', isActive: true },
  ];
  public roles: string[] = ['Developer', 'Product Owner', 'UX Designer'];

  // multiple form
  public mode: 'view' | 'edit' = 'view';
  public groupedForm: UntypedFormGroup;
  public identity = {
    name: 'John Doe',
    city: 'London',
    country: 'England',
  };

  ngOnInit(): void {
    this.formArray = new UntypedFormArray(this.toGroups());
    this.initGroupedForm();
  }

  getControl(index: number, field: string): UntypedFormControl {
    return this.formArray.at(index).get(field) as UntypedFormControl;
  }

  toGroups(): AbstractControl[] {
    return this.accounts.map((account) => {
      return new UntypedFormGroup({
        name: new UntypedFormControl(account.name),
        role: new UntypedFormControl(account.role),
        isActive: new UntypedFormControl(account.isActive),
      });
    });
  }

  initGroupedForm(): void {
    this.groupedForm = new UntypedFormGroup({
      name: new UntypedFormControl(this.identity.name),
      city: new UntypedFormControl(this.identity.city),
      country: new UntypedFormControl(this.identity.country),
    });
  }

  updateSingleField(prop: any, control: any): void {
    this[prop] = this[control].value;
  }

  updateField(index: number, field: string): void {
    const control = this.getControl(index, field);

    if (control.valid) {
      this.accounts[index][field] = control.value;
    }
  }

  cancelSingleField(prop: string, control: any): void {
    (this[control] as AbstractControl).setValue(this[prop]);
  }

  cancel(index: number, field: string): void {
    const control = this.getControl(index, field);
    control.setValue(this.accounts[index][field]);
  }

  updateGroupedEdition(): void {
    this.identity = this.groupedForm.value;
  }

  cancelGroupedEdition(): void {
    this.groupedForm.setValue(this.identity);
  }

  handleModeChange(mode: 'view' | 'edit'): void {
    this.mode = mode;
  }
}
