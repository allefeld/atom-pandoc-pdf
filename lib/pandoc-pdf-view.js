'use babel'

import { CompositeDisposable } from 'atom'


export default class PandocPdfView {


  constructor(editor) {
    console.log('▶ PandocPdfView constructor')
    
    this.subscriptions = new CompositeDisposable()
    
    // create HTML div for view
    this.element = document.createElement('div')
    this.element.classList.add('pandoc-pdf-view')
    this.element.innerHTML = `
      <span class="inline-block text-highlight">Pandoc/PDF</span>
      <span class="inline-block close-button pull-right icon icon-x"></span>
    `
    const closeButton = this.element.lastElementChild
    closeButton.addEventListener('click', (event) => this.destroy())
    this.subscriptions.add(
      atom.tooltips.add(closeButton, {
        title: 'Close',
        keyBindingCommand: 'pandoc-pdf:close'
      })
    )
    
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
  
  
  destroy() {
    console.log('▶ PandocPdfView destroy')
    
    this.editor.element.style.marginTop = '0px'
    this.editor.element.removeChild(this.element)
    this.editor = null
    this.element.model = null
    this.element = null
    this.subscriptions.dispose()
    
    console.log('◀ PandocPdfView destroy')
  }
  
  
  // **************************************************************************


  process() {
    console.log('hej')
  }
  
  
}
