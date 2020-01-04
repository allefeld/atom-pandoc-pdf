todo

-   de/serialize

-   Pandoc/PDF reference
    -   Pandoc's Markdown
    -   metadata and template variables for latex/beamer/html/ms
    -   useful defaults file settings
    -   more compact format

-   canonical Pandoc icon??

-   The temporary directory is deleted if PP is closed because PandocPdfView.destroy() calls PandocPdfProcessor.destroy().
    The same does not happen if Atom is exited or reloaded, probably because Atom does not destroy objects.
    Which means I would have to do it when the package is deactivated. (I hope that does happen...)
    On the other hand, if the PDF view is de/serialized, the respective viewer expects the PDF to still be there. So maybe never delete temporary directories?
    Which might be okay because /tmp is cleaned automatically, and which deterministic temporary directory names there aren't that many anyway.
    For now, disabled deletion.
