<p align="center">
 <img width="20%" height="20%" src="./logo.svg" alt="project logo">
</p>

<br />

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
[![ngneat](https://img.shields.io/badge/@-ngneat-383636?style=flat-square&labelColor=8f68d4)](https://github.com/ngneat/)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()

> Simplify the edition in place for Angular applications

**Edit in place** is a complete solution to switch modes between a content and a form tag to edit it.  
Following open/closed principle, the library focus on the switch mecanism, giving you full control on the data you want to update and the content you want to display and the way to edit it.

[Demo](https://ngneat.github.io/edit-in-place)

## Features

- ✅ Fully customizable
- ✅ Manual trigger support 
- ✅ Reactive Forms support
- ✅ Multiple Forms support


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Multiple forms](#multiple-forms)

## Installation

`ng add @ngneat/edit-in-place`

You can provide additional options :
- --module
- --project

## Usage

Add the `EditableModule` to your `AppModule`.

```typescript
import { EditableModule } from '@ngneat/edit-in-place';

@NgModule({
  declarations: [AppComponent],
  imports: [EditableModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Now you can use the `<editable>` component :

```html
<editable>
    <ng-template viewMode>
        <!-- content to display -->
    </ng-template>
    <ng-template editMode>
        <!-- edit content -->
    </ng-template>
</editable>
```


### Change the active mode

By default you can switch mode with single clicking :
- into the *viewMode* content to switch to *editMode*
- outside of the *editable* component to switch back to *viewMode*

You can customize the switch behavior by providing a `MouseEvent` type :

```html
<editable 
  openBindingEvent="dblclick"
  closeBindingEvent="dblclick"
>
    <!-- content -->
</editable>
```

You can set this value globally inside the providers array of your `AppModule` :

```typescript
@NgModule({
  ...
  providers: [
    {
      provide: EDITABLE_CONFIG, useValue: {
        openBindingEvent: 'dblclick',
        closeBindingEvent: 'dblclick',
      } as EditableConfig
    }
  ]
})
export class AppModule {}
```


### Event emitters

Add the `(save)` event binding to handle the update of the content.   
It's triggered by the :
- *editableOnEnter* directive
- *editableOnSave* directive
- *closeBinbingEvent* @Input() `MouseEvent

```html
<editable (save)="updateField()">
    <!-- content -->
</editable>
```

Optionally you can add the `(cancel)` event binding to handle the reset of the value of a formControl.
It's triggered by the :
- *editableCancel* directive
- *editableOnEscape* directive


```html
<editable (cancel)="resetField()">
    <!-- content -->
</editable>
```

## Customization

### Handle events manually

You can use the `editableOnUpdate` and `editableOnCancel` directives to trigger the update or the reset of the value on chosen html tags.

```html
<editable (save)="updateField()" (cancel)="resetField()">
    <!-- viewMode content -->
    <ng-template editMode>
        <input type="text">
        <button editableOnSave>save</button>
        <button editableOnCancel>cancel</button>    
    </ng-template>
</editable>
```


### Handle focus

As a focusable form tag might be nested or custom, it isn't focused by default when the *editMode* is displayed.  
You can add the *editable-focus* directive on the input :

```html
<editable (cancel)="resetField()">
    <!-- viewMode content -->
    <ng-template editMode>
        <input editableFocusable type="text">   
    </ng-template>
</editable>
```

## Inputs

| @Input                 | Type                      | Description                                                  | Default                                                                |
| ---------------------- | ------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| openBinbindEvent       | `string`                  | The MouseEvent type to display the editMode                  | `click`                                                              |
| closeBindingEvent      | `string`                  | The MouseEvent type to display the viewMode                  | `click`                                                                 |

## Outputs

| @Output                | Type                      | Description                                                                                                               |
| ---------------------- | ------------------------- | ------------------------------------------------------------
| save                   | `void`                    | triggered by the editableOnSave and editableOnEnter directives and the MouseEvent on closeBindingEvent @Input                                                                               |
| cancel                 | `void`                    | triggered by the editableCancel and editableOnEscape directives                                                                                 |


## Directives

#### editableFocusable

Focus the host element when switching to *editMode* (for nested inputs).

#### editableOnEnter

Listen to keyup enter to switch to *viewMode* and update the value of the *viewMode* host element.

#### editableOnEscape

Listen to keyup escape to switch to *viewMode* without updating the value of the *viewMode* host element.

#### editableOnSave

Listen to a `MouseEvent on ths host element in order to switch to *viewMode* and udpate the value of the content of the *viewMode* host element.

| @Input                 | Type                      | Description                                                  | Default                                                                |
| ---------------------- | ------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| saveEvent              | `string`                  | The MouseEvent type used to trigger the @Output() save       | `click`                                                              |


#### editableOnCancel

Listen to a MouseEvent on ths host element in order to trigger to switch to viewMode without updating the value of the viewMode host element.


| @Input                 | Type                      | Description                                                  | Default                                                                |
| ---------------------- | ------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| cancelEvent            | `string`                  | The MouseEvent type used to trigger the @Output() cancel     | `click`                                                              |


## Multiple forms

**Edit-in-place** also supports to switch between modes for multiple components at once.

Add the *editable-group* directive on a parent html tag of your *editable* components :

```html
<section editableGroup>
  <editable></editable>
  <editable></editable>
  <editable></editable>
</section>
```

### Change the active mode

> Unlike using a single *editable* component, an *editableGroup* doesn't support `MouseEvent` events on the component to switch modes.

You can switch modes by using dedicated directives on html button tag to switch mode for the whole group :
- *editableGroupEdit* to switch to *editMode*
- *editableGroupSave* to save the value of each form tag and switch to *viewMode*
- *editableGroupCancel* to switch to *viewMode* without saving the value of each form tag

```html
<section editableGroup>
  <button editableGroupEdit>Edit</button>
  <button editableGroupSave>Save</button>
  <button editableGroupCancel>Cancel</button>
  <editable></editable>
  <editable></editable>
  <editable></editable>
</section>
```

In order to display the button accordingly with the active mode, you can use the `(editionOpened)` @Output :

```html
<section editableGroup>
  <button editableGroupEdit (editionOpened)="displayView($event)">Edit</button>
  <button editableGroupSave (editionOpened)="displayEdition($event)">Save</button>
  <button editableGroupCancel (editionOpened)="displayEdition($event)">Cancel</button>
  <editable></editable>
  <editable></editable>
  <editable></editable>
</section>
```

### Event emitters

Add the `(save)` event binding to handle the update of the group.   
It's triggered by the *editableGroupSave* directive.

```html
<section (save)="updateGroup()">
    <editable></editable>
    <editable></editable>
    <editable></editable>
</section>
```

Optionally you can add the `(cancel)` event binding to handle the reset of the value of the group.
It's triggered by the *editableGroupCancel* :

```html
<section (cancel)="cancelUpdate()">
    <editable></editable>
    <editable></editable>
    <editable></editable>
</section>
```

## Directives

#### editableGroup

Overcharges the behavior of children editable Components to work as one entity.

| @Output                | Type                      | Description                                                                                                               |
| ---------------------- | ------------------------- | ------------------------------------------------------------
| save                   | `void`                    | triggered by the editableGroupSave directive                                                                           |
| cancel                 | `void`                    | triggered by the editableGroupCancel directive                                                                               |


#### editableGroupEdit

Listen to a click `MouseEvent` to switch to *editMode*.

| @Output                | Type                      | Description                                                                                                               |
| ---------------------- | ------------------------- | ------------------------------------------------------------
| editionOpened          | `boolean`                 | triggered by the editableGroupEdit, editableGroupSave and editableGroupCancel directives when switching modes                                                                              |

#### editableGroupSave

Listen to a click `MouseEvent` to switch to *viewMode* and update the value of the group.

| @Output                | Type                      | Description                                                                                                               |
| ---------------------- | ------------------------- | ------------------------------------------------------------
| editionOpened          | `boolean`                 | triggered by the editableGroupEdit, editableGroupSave and editableGroupCancel directives when switching modes                                                                              |

#### editableGroupCancel

Listen to a click `MouseEvent` to switch to *viewMode* without updating the value of the group.

| @Output                | Type                      | Description                                                                                                               |
| ---------------------- | ------------------------- | ------------------------------------------------------------
| editionOpened          | `boolean`                 | triggered by the editableGroupEdit, editableGroupSave and editableGroupCancel directives when switching modes                                                                              |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://gerome-dev.netlify.com/"><img src="https://avatars0.githubusercontent.com/u/32737308?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gérôme Grignon</b></sub></a><br /><a href="https://github.com/@ngneat/edit-in-place/commits?author=geromegrignon" title="Code">💻</a> <a href="https://github.com/@ngneat/edit-in-place/commits?author=geromegrignon" title="Documentation">📖</a> <a href="#ideas-geromegrignon" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

Logo made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
