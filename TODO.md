# todo

-   de/serialize?

    don't know how:

    -   there would have to be a way to get an ID from an editor and an editor from an ID (URI is buffer- not editor-specific)
    -   it would have to be ensured on deserialization of a PandocPdfView object that the corresponding editor has already been deserialized.
    -   or hook into observeTextEditors or observeActiveTextEditor?
