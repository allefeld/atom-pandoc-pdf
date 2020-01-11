'use babel'

import PandocPdfView from './pandoc-pdf-view.js'
import { CompositeDisposable } from 'atom'


export default {


  'config': {
    'processOnSave': {
      'type': 'boolean',
      'default': true,
      'order': 1,
      'title': 'Process on Save',
      'description': `Whether the document should be processed into PDF every
      time it is saved.<br>
      Disable if processing takes very long or you save the file very often,
      and use the keyboard shortcut instead.
      `
    },
    'pandocPdfEngine': {
      'type': 'string',
      'default': 'Latexmk + pdfLaTeX',
      'enum': [
          'Latexmk + pdfLaTeX',
          'Latexmk + XeLaTeX',
          'Latexmk + LuaLaTeX',
          'ConTeXt + pdfTeX',
          'ConTeXt + XeTeX',
          'ConTeXt + LuaTeX',
          'wkhtmltopdf',
          'WeasyPrint',
          'Prince',
          'pdfroff'
        ],
      'order': 2,
      'title': 'Pandoc PDF Engine',
      'description': `The program(s) used by Pandoc to create the PDF.<br>
      This setting implies the intermediate output format, and thereby the
      default template, used by Pandoc:<br>
      \`latex\` for Latexmk, \`context\` for ConTeXt, \`html\` for wkhtmltopdf,
      WeasyPrint, and Prince, and \`ms\` for pdfroff.`
    },
    'pandocTemplate': {
      'type': 'string',
      'default': '',
      'order': 3,
      'description': `The name of the
      [template file](https://pandoc.org/MANUAL.html#templates) used by Pandoc
      to produce the intermediate document that is then processed by the PDF
      engine.<br>
      If not set, Pandoc's default template for the intermediate output format
      is used. If set, it should be made specific to the intermediate output
      format by using the variable \`\${writer}\`.`
    },
    'pandocDefaults': {
      'type': 'string',
      'default': '',
      'order': 4,
      'description': `The name of a
      [defaults file](https://pandoc.org/MANUAL.html#default-files) containing
      additional Pandoc options in YAML format.<br>
      If set, it should be made specific to the intermediate output format by
      using the variable \`\${writer}\`.<br>
      Pandoc supports defaults files since version 2.8, and the interplay of a
      general defaults file specified here and a local defaults file (see above)
      works properly <span class="text-highlight">since version 2.9.1</span>.`
    },
    'pandocBeamer': {
      'type': 'string',
      'default': '',
      'order': 5,
      'title': 'Write beamer',
      'description': `Use the intermediate output format \`beamer\` instead of
      \`latex\` if the file's pathname matches this JavaScript regular
      expression.<br>
      Pandoc supports the generation of presentation slides via the LaTeX
      package beamer through a special output format, but it is not implied by
      any of the PDF engine settings. As a workaround, this setting allows to
      select \`beamer\` based on the pathname.`
    },
    'pandocInputFormats': {
      'type': 'object',
      'order': 6,
      'description': `Configure which input file extensions should be associated
      with which of Pandoc's input file formats, extending Pandoc's
      autodetection.`,
      'properties': {
        'fileExtensions': {
          'title': 'Configured File Extensions',
          'type': 'string',
          'default': '',
          'order': 1,
          'description': `Comma-separated list of the file extensions for which
          an input format should be configured. Extension can include \`.\`s.
          After <span class="text-highlight">Atom is restarted</span>, for each
          of them an additional settings field appears below, where a Pandoc
          input format specification incl. format extensions can be entered.`
        }
      }
    },
    'pandocPath': {
      'title': 'Path to Pandoc binary',
      'type': 'string',
      'order': 7,
      'default': 'pandoc',
      'description': `If Pandoc is not found automatically, its pathname can be
      specified here.`
    }
  },


  subscriptions: null,


  activate(state) {
    // collect subscribed events, to be disposed upon deactivation
    this.subscriptions = new CompositeDisposable()
    // register command that opens the Pandoc/PDF view and processes
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'pandoc-pdf:open': () => this.openAndProcess()
      })
    )
    // register command that closes the Pandoc/PDF view
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'pandoc-pdf:close': () => this.close()
      })
    )
    // hook into core:save to trigger processing
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'core:save': () => this.processOnSave()
      })
    )
    // hook into core:cancel (ESC) to close the view
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'core:cancel': () => this.hideLog()
      })
    )

    // create configuration entries below `pandocInputFormats`
    // for extensions specified in `fileExtensions`
    const exts = atom.config.get('pandoc-pdf.pandocInputFormats.fileExtensions')
    // work around `split` behavior on empty string
    if (exts != '') {
      const props = this.config.pandocInputFormats.properties
      // iterate over specified extensions
      var order = 2;
      for (let ext of exts.split(',')) {
        // all characters allowed, except for '/', the one character not
        // allowed in a file name on any of the platforms.
        if (!ext.includes('/')) {
          // normalize: must start with '.'
          if (!ext.startsWith('.')) {
            ext = '.' + ext
          }
          // encode for key, because '.' has special effects in keys
          // use disallowed character '/' for '.'
          let extKey = ext.replace(/\./g, '/')
          // create configuration entry
          props[extKey] = {
            title: 'Input Format for ' + ext,
            type: 'string',
            default: '',
            order: order
          }
          // order configuration entries in the order the extensions are given
          order++
        }
      }
    }
  },


  deactivate() {
    // dispose subscribed events
    this.subscriptions.dispose()
  },


  // open Pandoc/PDF view & start processing
  async openAndProcess() {
    // get or create PandocPdfView for active editor
    ppv = await PandocPdfView.get(true)
    // if successful, initiate processing
    if (ppv) {
      ppv.process()
    }
  },


  // close Pandoc/PDF view
  async close() {
    // get PandocPdfView for active editor
    ppv = await PandocPdfView.get(false)
    // if exists, destroy it
    if (ppv) {
      ppv.destroy()
    }
  },


  // start processing, depending on option
  async processOnSave() {
    if (atom.config.get('pandoc-pdf.processOnSave')) {
      // get PandocPdfView for active editor
      ppv = await PandocPdfView.get(false)
      // if exists, initiate processing
      if (ppv) {
        ppv.process()
      }
    }
  },


  // hide log
  async hideLog() {
    if (atom.config.get('pandoc-pdf.processOnSave')) {
      // get PandocPdfView for active editor
      ppv = await PandocPdfView.get(false)
      // if exists, initiate processing
      if (ppv) {
        ppv.showLog(false)
      }
    }
  },


}
