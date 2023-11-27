import {
  SchematicTestRunner,
  UnitTestTree
} from '@angular-devkit/schematics/testing';
import { join } from 'path';

import { setupProject } from '../utils/test-utils';
import { SchemaOptions as ModelSchema } from '../ng-add/schema';

const schematicCollectionPath = join(
  __dirname,
  '../../node_modules/@schematics/angular/collection.json'
);
const customCollectionPath = join(__dirname, '../collection.json');

const schematicRunner = new SchematicTestRunner(
  '@schematics/angular',
  schematicCollectionPath
);
const customRunner = new SchematicTestRunner(
  'schematics',
  customCollectionPath
);

const defaultOptions: ModelSchema = Object.freeze({
  module: 'app',
  project: 'defaultProject'
});

describe('ng-add schematic', () => {
  let appTree: UnitTestTree;

  beforeEach(async () => {
    appTree = await setupProject(schematicRunner);
  });

  describe('WHEN using the default options', () => {
    beforeEach(async () => {
      const options = {...defaultOptions};
      appTree = await customRunner
        .runSchematic('ng-add', options, appTree);
    });

    it('THEN should include the EditableModule in app.module', () => {
      expect(appTree.exists('/src/app/app.module.ts')).toBeTrue();
      const importDeclaration = appTree.readContent('/src/app/app.module.ts').includes(`import { EditableModule } from '@ngneat/edit-in-place';`);
      expect(importDeclaration).toBeTrue();
    });
  });
});
