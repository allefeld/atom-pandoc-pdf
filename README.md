# Pandoc/PDF

Pandoc/PDF is a package for the [Atom editor](https://atom.io/) that makes it easy to use the *universal document converter* [Pandoc](https://pandoc.org/) directly from an editor pane to create a PDF, and to view that PDF in another Atom pane.

![](pandoc-pdf.apng)

Activated by keyboard shortcut (default `Alt-P`) or menu item, Pandoc/PDF inserts a toolbar into the active editor, processes the document with Pandoc, and shows the resulting PDF. By default, the document is reprocessed every time it is saved, but that can be deactivated and reprocessing triggered with the shortcut or a toolbar button.

Pandoc/PDF supports all text-based input formats that can be autodetected by Pandoc, including Pandoc's Markdown, reStructuredText, Textile, MediaWiki & DokuWiki markup, and DocBook. It supports PDF generation via Pandoc's `latex`, `beamer`, `context`, `html`, and `ms` output formats.


## Installation and prerequisites

Install from Atom's Settings/Install dialog (search for `pandoc-pdf`) or via `apm install pandoc-pdf`.

Pandoc needs to be installed and on the path. For full functionality, version 2.9.1 or later is recommended.

At least one PDF engine needs to be installed:

-   Latexmk and pdfLaTeX, XeLaTeX, or LuaLaTeX (e.g. from [TeX Live](https://www.tug.org/texlive/) or [MiKTeX](https://miktex.org/about))
-   ConTeXt and pdfTeX, XeTeX, or LuaTeX (e.g. from [TeX Live](https://www.tug.org/texlive/))
-   [wkhtmltopdf](https://wkhtmltopdf.org/), [WeasyPrint](https://weasyprint.org/), or [Prince](https://www.princexml.com/)
-   pdfroff (from [GNU troff](https://www.gnu.org/software/groff/))

If you choose LaTeX, see the [Pandoc documentation](https://pandoc.org/MANUAL.html#creating-a-pdf) for a list of the LaTeX packages used by the default template.

To view the generated PDF within Atom, the [PDF View package](https://atom.io/packages/pdf-view) has to be installed.


# Toolbar buttons

The toolbar contains the following buttons:

<dl>

<dt><span style="transform: scaleX(-1)">¶</span> &nbsp; Process with Pandoc into PDF</dt>

<dd>
Triggers reprocessing with Pandoc. Processing occurs in the background, and Pandoc’s log messages are shown in the “Log Messages” dialog.
</dd>

<dt><img src="doc/three-bars.svg"/> &nbsp; Toggle Pandoc log messages</dt>

<dd>
Toggles an overlay dialog with shows the Pandoc call including command line arguments, Pandoc’s log messages, and its exit code. The icon is animated during processing, and changes color if warning or error messages are found. If Pandoc aborts processing with an error, the dialog opens automatically.
</dd>

<dt><img src="doc/file-pdf.svg"/> &nbsp; Save generated PDF</dt>

<dd>
Pandoc generates the PDF file in a temporary directory along with other files, and opens it from there. This button allows to save the PDF to a user-chosen directory.
</dd>

<dt><img src="doc/circuit-board.svg"/> &nbsp; Open local defaults file in Atom</dt>

<dd>
Recent versions of Pandoc allow options to be specified in a YAML-format <a href="https://pandoc.org/MANUAL.html#default-files">“Defaults File”</a>. Pandoc/PDF checks whether a file with the same name as the document but the extension <code>.yaml</code> is present in the document’s directory, and if yes, passes it to Pandoc. This button makes it easy to create and edit such a local defaults file.
</dd>

<dt><img src="doc/file-directory.svg"/> &nbsp; Show intermediate files generated by Pandoc</dt>

<dd>
Opens the temporary directory in the system file browser.
</dd>

<dt><img src="doc/tools.svg" /> &nbsp; Show Pandoc/PDF settings</dt>

<dd>
Opens the Pandoc/PDF package settings dialog.
</dd>

<dt><img src="doc/question.svg"/> &nbsp; Show Pandoc/PDF reference</dt>

<dd>
Shows reference text.
</dd>

</dl>
