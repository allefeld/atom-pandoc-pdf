'use babel'

import PandocPdfProcessor from './pandoc-pdf-processor.js'
import { CompositeDisposable } from 'atom'


export default class PandocPdfView {
  
  
  // get PandocPdfView from active editor, optionally creating it
  static get(create) {
    // get active editor
    const editor = atom.workspace.getActiveTextEditor()
    if (!editor) {
      return undefined
    }
    // is there a Pandoc/PDF view in the editor?
    var ppvElement = editor.element.querySelector('.pandoc-pdf-view')
    if (ppvElement) {
      // if yes, return its PandocPdfView
      return ppvElement.model
    } else {
      // if not, optionally create it
      if (create) {
        return new PandocPdfView(editor)
      } else {
        return undefined
      }
    }
  }
  

  // create PandocPdfView
  constructor(editor) {
    console.log('▶ PandocPdfView constructor')
    
    this.subscriptions = new CompositeDisposable()
    
    // create HTML div for view
    this.element = document.createElement('div')
    this.element.classList.add('pandoc-pdf-view')
    this.element.innerHTML = `
      <span class="pandoc-pdf-heading inline-block-tight text-highlight">Pandoc/PDF</span>
      <span class="pandoc-pdf-spacer"></span>
      <span class="inline-block-tight btn icon icon-pandoc">                                  Process</span>
      <span class="inline-block-tight btn icon icon-file-pdf">                                Save PDF</span>
      <span class="pandoc-pdf-spacer"></span>
      <span class="inline-block-tight btn icon icon-three-bars"     data-id="toggle-log">     Log</span>
      <span class="inline-block-tight btn icon icon-gear"           data-id="open-defaults">  Local Defaults</span>
      <span class="pandoc-pdf-spacer"></span>
      <span class="inline-block-tight btn icon icon-file-directory">                          Files</span>
      <span class="inline-block-tight btn icon icon-tools"          data-id="show-settings">  Settings</span>
      
      <span class="inline-block-tight pandoc-pdf-close icon icon-x" data-id="close-view"></span>
      
      <div class="pandoc-pdf-dialog" style="display: none">
        <div>
          <span class="inline-block text-highlight">Pandoc/PDF Log</span>
          <span class="inline-block pandoc-pdf-close icon-x"        data-id="hide-log"></span>
        </div>
        <div class="pandoc-pdf-log">
        </div>
      </div>
    `
    // add function to buttons
    this.element.querySelector('[data-id="toggle-log"]').
      addEventListener('click', (event) => this.showDialog())
    this.element.querySelector('[data-id="hide-log"]').
      addEventListener('click', (event) => this.showDialog(false))
    this.element.querySelector('[data-id="close-view"]').
      addEventListener('click', (event) => this.destroy())
    this.element.querySelector('[data-id="show-settings"]').
      addEventListener('click', (event) => atom.workspace.open("atom://config/packages/pandoc-pdf"))
    // electron.shell.showItemInFolder(fullPath)
    
    // make this view object accessible from the HTML div
    this.element.model = this

    // remember the associated editor
    this.editor = editor
    
    // add div as first child to editor
    this.editor.element.prepend(this.element)
    
    // fit the absolutely positioned div above the editor
    //   height of div
    const height = this.element.offsetHeight  // account for margin?
    //   make space for div through editor margin-top
    this.editor.element.style.marginTop = height + 'px'    
    //   move div into the space
    this.element.style.top = '-' + height + 'px'    
    
    console.log('◀ PandocPdfView constructor')
  }
  
  
  // destroy PandocPdfView
  destroy() {
    console.log('▶ PandocPdfView destroy')
    
    this.editor.element.style.marginTop = '0px'
    this.editor.element.removeChild(this.element)
    this.editor = null
    this.element.model = null
    // remove event listeners?
    this.element = null
    this.subscriptions.dispose()
    
    console.log('◀ PandocPdfView destroy')
  }
  
  
  // **************************************************************************


  showDialog(show) {
    console.log('▶ PandocPdfView showDialog')
    
    // called without argument? → toggle
    const ppd = this.element.querySelector('.pandoc-pdf-dialog')
    if (show === undefined) {
      show = (ppd.style.display == "none")
    }
    // set "display" property of dialog according to show
    ppd.style.display = show ? 'block' : 'none'
    // add/remove "selected" class to button according to show
    const tl = this.element.querySelector('[data-id="toggle-log"]')
    if (show) {
      tl.classList.add('selected')
    } else {
      tl.classList.remove('selected')
    }
    
    console.log('◀ PandocPdfView showDialog')
  }


  process() {
    console.log('hej')
  }
  
}
