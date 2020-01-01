# Pandoc/PDF

Pandoc/PDF is an [Atom](https://atom.io/) package that makes it easy to use the "universal document converter" [Pandoc](https://pandoc.org/) directly from an editor pane to create a PDF, and to view that PDF in another Atom pane.

![](pandoc-pdf.apng)

Activated by keyboard shortcut (default `Alt-P`) or menu item, Pandoc/PDF inserts a toolbar into the active editor, processes the document with Pandoc, and shows the resulting PDF. By default, the document is reprocessed every time it is saved, but that can be deactivated and reprocessing triggered with the shortcut or a toolbar button.

Pandoc/PDF supports all text-based input formats that can be autodetected by Pandoc, including (Pandoc's) Markdown, reStructuredText, Textile, MediaWiki & DokuWiki markup, and DocBook. It supports PDF generation via Pandoc's `latex`, `context`, `html`, and `ms` output formats.

For more information, see [doc/reference.md](doc/reference.md), also accessible through the "?"" toolbar button.


## Installation and prerequisites

Install from Atom's Settings/Install dialog (search for `pandoc-pdf`) or via `apm install pandoc-pdf`.

Pandoc needs to be installed and on the path. For full functionality, version 2.9.1 or later is recommended.

At least one PDF engine needs to be installed.
-   via `latex`: Latexmk and pdfLaTeX, XeLaTeX, or LuaLaTeX (e.g. from [TeX Live](https://www.tug.org/texlive/) or [MiKTeX](https://miktex.org/about))\
    See [Pandoc's documentation](https://pandoc.org/MANUAL.html#creating-a-pdf) for a list of LaTeX packages used by the default template.
-   via `context`: ConTeXt and pdfTeX, XeTeX, or LuaTeX (e.g. from [TeX Live](https://www.tug.org/texlive/))
-   via `html`: [wkhtmltopdf](https://wkhtmltopdf.org/), [WeasyPrint](https://weasyprint.org/), or [Prince](https://www.princexml.com/)
-   via `ms`: pdfroff (from [GNU troff](https://www.gnu.org/software/groff/))

To view the generated PDF within Atom, the [PDF View package](https://atom.io/packages/pdf-view) has to be installed.

For syntax highlighting of Pandoc's Markdown, the [language-markdown](https://atom.io/packages/language-markdown) Atom package is recommended.
