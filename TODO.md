# todo

-   show selected format in toolbar

-   button within log to copy Pandoc command

-   make "write beamer" extension-based, too (no regex)

-   Pandoc/PDF reference
    -   Pandoc's Markdown
    -   metadata and template variables for latex/beamer/html/ms
    -   useful defaults file settings
    -   more compact format

-   destroyed if editor is closed? no
    → listen to editor close

-   delete everything but pdf on destroy()?

***

-   de/serialize?

    don't know how:

    -   there would have to be a way to get an ID from an editor and an editor from an ID

    -   it would have to be ensured on deserialization of a PandocPdfView object that the corresponding editor has already been deserialized.

    -   or hook into observeTextEditors or observeActiveTextEditor?

-   canonical Pandoc icon, if and when jgm decides

<http://www.google.com>
