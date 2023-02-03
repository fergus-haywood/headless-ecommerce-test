import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'headless-ecommerce-test',

  projectId: 'nqddzz19',
  dataset: 'production',

  plugins: [deskTool(
  //   {
  //   structure: S => S.documentTypeListItems(),
  //   name: 'desk',
  //   title: 'Desk'
  // }
  )
, visionTool()],

  schema: {
    types: schemaTypes,
  },
})

