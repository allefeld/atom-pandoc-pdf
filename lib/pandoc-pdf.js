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


  // open Pandoc/PDF view
  async open() {
    console.log('▶ pandoc-pdf open')
    
    // get active editor
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {

      // is there a Pandoc/PDF view in the editor?
      var element = editor.element.querySelector('.pandoc-pdf-view')
      if (element) {
        // if yes, get model
        ppv = element.model
      } else {
        // if not, create and insert
        ppv = new PandocPdfView(editor)
      }
      
      // initiate processing
      ppv.process()
        
    }
    
    console.log('◀ pandoc-pdf open')
  },
  
  
  // close Pandoc/PDF view
  async close() {
    console.log('▶ pandoc-pdf close')
    
    // get active editor
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      // is there a Pandoc/PDF view in the editor?
      const collection = editor.element.getElementsByClassName('pandoc-pdf-view')
      if (collection.length > 0) {
        // if yes, close it
        collection[0].model.destroy()
      }
    }
    
    console.log('◀ pandoc-pdf open')
  }

}
