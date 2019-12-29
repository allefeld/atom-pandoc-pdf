'use babel'

import PandocPdfView from './pandoc-pdf-view.js'
import { CompositeDisposable } from 'atom'


export default {


  'config': {
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
      'order': 1,
      'title': 'Pandoc PDF Engine',
      'description': `The program(s) used by Pandoc to [create the
        PDF](https://pandoc.org/MANUAL.html#creating-a-pdf).<br>Sets the
        \`--pdf-engine\` and \`--pdf-engine-opt\` options. This setting implies
        the default \`writer\` format (and thereby the default template) used by
        Pandoc: 'latex' for Latexmk, 'context' for ConTeXt, 'html' for
        wkhtmltopdf, WeasyPrint, and Prince, and 'ms' for pdfroff.`
    },
    'pandocBeamer': {
      'type': 'string',
			'default': '',
      'order': 2,
      'title': 'Write beamer',
      'description': `Use the writer format 'beamer' instead of 'latex' if the
        file's pathname matches this JavaScript regular expression.<br>If not
        empty and matches, passes the option \`--write=beamer\`.`
    },
    'pandocTemplate': {
      'type': 'string',
			'default': '',
      'order': 3,
      'description': `The name of the [template
        file](https://pandoc.org/MANUAL.html#templates) used by Pandoc to
        produce the intermediate document that is then processed by the PDF
        engine.<br>If not empty, passes a \`--template\` option. Can be made
        writer-specific by using the variable \`\${writer}\`.`
    },
    'pandocDefaults': {
      'type': 'string',
			'default': '',
      'order': 4,
      'description': `The name of a [defaults
        file](https://pandoc.org/MANUAL.html#default-files) containing
        additional Pandoc options.<br>If not empty, passes a \`--defaults\`
        option. Can be made writer-specific by using the variable
        \`\${writer}\`.<br><span class='text-warning'>WARNING:</span> needs
        Pandoc ≥ 2.8!`
    },
    'pandocSourceDefaults': {
      'type': 'boolean',
      'default': false,
      'order': 5,
      'title': 'Source-specific Pandoc Defaults',
      'description': `Whether to use a source-file-specific [defaults
        file](https://pandoc.org/MANUAL.html#default-files).<br>If set, passes
        the option \`--defaults=<source-file>.yaml\`, if that file exists in
        the source file's directory.<br><span class='text-warning'>WARNING:
        </span> needs Pandoc ≥ 2.8, recommended ≥ 2.9.1!`
    },
    'processOnSave': {
      'type': 'boolean',
      'default': true,
      'order': 6,
      'title': 'Process on Save',
      'description': `After the Pandoc/PDF view has been created, process the
        file into PDF every time it is saved.<br>Disable if processing takes
        very long, or you save the file very often.`
    }
  },


  subscriptions: null,


  activate(state) {
    console.log('▶ pandoc-pdf activate')
    
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
    console.log('◀ pandoc-pdf activate')
  },


  deactivate() {
    // dispose subscribed events
    this.subscriptions.dispose()
  },
  
  
  // open Pandoc/PDF view & start processing
  async openAndProcess() {
    console.log('▶ pandoc-pdf open')
    
    // get or create PandocPdfView for active editor
    ppv = await PandocPdfView.get(true)
    // if successful, initiate processing
    if (ppv) {
      ppv.process()
    }
    
    console.log('◀ pandoc-pdf open')
  },
  
  
  // close Pandoc/PDF view
  async close() {
    console.log('▶ pandoc-pdf close')
    
    // get PandocPdfView for active editor
    ppv = await PandocPdfView.get(false)
    // if exists, destroy it
    if (ppv) {
      ppv.destroy()
    }
    
    console.log('◀ pandoc-pdf close')
  },


  // start processing, depending on option
  async processOnSave() {
    console.log('▶ pandoc-pdf process')
    
    if (atom.config.get('pandoc-pdf.processOnSave')) {
      // get PandocPdfView for active editor
      ppv = await PandocPdfView.get(false)
      // if exists, initiate processing
      if (ppv) {
        ppv.process()
      }
    }
    
    console.log('◀ pandoc-pdf process')
  },
  
  
}
