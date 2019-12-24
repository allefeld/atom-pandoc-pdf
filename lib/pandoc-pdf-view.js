'use babel'

export default class PandocPdfView {

  constructor(editor) {
    console.log("▶ PandocPdfView constructor")
    
    // create HTML div for view
    this.element = document.createElement('div')
    this.element.classList.add('pandoc-pdf-view')
    this.element.innerHTML = "<span>Pandoc/PDF</span><br><label class='input-label'><input class='input-checkbox' type='checkbox' checked> Process on Save</label>"
    this.element.style.position = 'absolute'
    
    // make this view object accessible from the HTML div
    this.element.model = this

    // remember the associated editor
    this.editor = editor
    this.editor.element.prepend(this.element)
    
    // observe (re-) sizing to be able to fit the absolutely positioned div
    // above the editor
    this.resizeObserver = new ResizeObserver(
      (entries, observer) => this.resized())
    this.resizeObserver.observe(this.element, {box: "border-box"})

    console.log("◀ PandocPdfView constructor")
  }
  
  resized() {
    console.log("▶ PandocPdfView resized")
    const height = this.element.offsetHeight + 10 // account for margin HACK better: https://stackoverflow.com/a/29548116/2056067
    // make space for div
    this.editor.element.style.marginTop = height + "px"
    // move it into the space
    this.element.style.top = "-" + height + "px"
    console.log("◀ PandocPdfView resized")
  }

  destroy() {
    console.log("▶ PandocPdfView remove")
    
    this.resizeObserver.disconnect()
    this.resizeObserver = null
    this.editor.element.style.marginTop = '0px'
    this.editor.element.removeChild(this.element)
    this.editor = null
    this.element.model = null
    this.element = null
    
    console.log("◀ PandocPdfView remove")
  }
  
  // **************************************************************************

  process() {
    console.log('hej')
  }
  
}
