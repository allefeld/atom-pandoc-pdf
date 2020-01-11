# todo

-   show selected format in toolbar

-   button within log to copy Pandoc command  
    better to ernable text selection?  
    mayb the selection problem is not css, but js mouse-event related?


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

    -   there would have to be a way to get an ID from an editor and an editor from an ID (URI is buffer- not editor-specific)

    -   it would have to be ensured on deserialization of a PandocPdfView object that the corresponding editor has already been deserialized.

    -   or hook into observeTextEditors or observeActiveTextEditor?

-   canonical Pandoc icon, if and when jgm decides

<https://pandoc.org/MANUAL.html>
