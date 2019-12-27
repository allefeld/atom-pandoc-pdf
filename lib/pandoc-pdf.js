'use babel'

import PandocPdfView from './pandoc-pdf-view.js'
import { CompositeDisposable } from 'atom'


export default {

  subscriptions: null,

  activate(state) {
    console.log('▶ pandoc-pdf activate')
    
    // collect subscribed events, to be disposed upon deactivation
    this.subscriptions = new CompositeDisposable()
    // register command that opens the Pandoc/PDF view
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'pandoc-pdf:open': () => this.open()
      })
    )
    // register command that closes the Pandoc/PDF view
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'pandoc-pdf:close': () => this.close()
      })
    )
    console.log('◀ pandoc-pdf activate')
  },


  deactivate() {
    // dispose subscribed events
    this.subscriptions.dispose()
  },
  
  
  // open Pandoc/PDF view & start processing
  open() {
    console.log('▶ pandoc-pdf open')
    
    // get or create PandocPdfView for active editor
    ppv = PandocPdfView.get(true)
    // if successful
    if (ppv) {
      // initiate processing
      ppv.process()
    }
    
    console.log('◀ pandoc-pdf open')
  },
  
  
  // close Pandoc/PDF view
  close() {
    console.log('▶ pandoc-pdf close')
    
    // get PandocPdfView for active editor
    ppv = PandocPdfView.get(false)
    // if exists, destroy it
    if (ppv) {
      ppv.destroy()
    }
    
    console.log('◀ pandoc-pdf close')
  }
}
