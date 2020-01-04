'use babel'

import PandocPdfView from './pandoc-pdf-view.js'
import { CompositeDisposable } from 'atom'


export default {


  'config': {
    'processOnSave': {
      'type': 'boolean',
      'default': true,
      'order': 1,
      'title': 'Process on Save'
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
      'title': 'Pandoc PDF Engine'
    },
    'pandocBeamer': {
      'type': 'string',
			'default': '',
      'order': 3,
      'title': 'Write beamer'
    },
    'pandocTemplate': {
      'type': 'string',
			'default': '',
      'order': 4
    },
    'pandocDefaults': {
      'type': 'string',
			'default': '',
      'order': 5
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
