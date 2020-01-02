---
title: Pandoc/PDF reference
---


# Defaults files

Pandoc supports defaults files from version 2.8. A defaults file is in YAML format, and its fields correspond to command line options. A `--defaults` command line option is treated as if the contained options were given in its place on the command line. Note that if an option is specified multiple times, options given later on the command line override those given earlier, except for repeatable options (`--metadata-file`, `--css`, `--include-in-header`, `--include-before-body`, `--include-after-body`, `--variable`, `--metadata`, `--syntax-definition`), where values are combined.   

The command line options likely to be relevant for use with PP, and their translation into defaults file fields are:

| command line                                  | defaults file                                    |
|-----------------------------------------------|--------------------------------------------------|
| `--read=`FORMAT[EXTENSIONS]                   | `reader:` FORMAT[EXTENSIONS]                     |
| `--write=`FORMAT[EXTENSIONS]                  | `writer:` FORMAT[EXTENSIONS]                     |
| `--data-dir=`DIRECTORY                        | `data-dir:` DIRECTORY                            |
| `--metadata-file=`FILE                        | `metadata-files:`                                |
|                                               | `  - `FILE                                       |
| `--template=`FILE                             | `template:` FILE                                 |
| `--variable=`KEY[:VALUE]                      | `variables:`                                     |
|                                               | `  `KEY`:` VALUE\|`true`                         |
| `--toc`                                       | `toc: true`                                      |
| `--toc-depth=`NUMBER                          | `toc-depth:` NUMBER                              |
| `--number-sections`                           | `number-sections: true`                          |
| `--number-offset=`NUMBERS                     | `number-offset:` NUMBERS (as list)               |
| `--top-level-division=`section\|chapter\|part | `top-level-division: section`\|`chapter`\|`part` |
| `--resource-path=`SEARCHPATH                  | `resource-path:` SEARCHPATH (as list)            |
| `--include-in-header=`FILE                    | `include-in-header:` FILEs (as list)             |
| `--include-before-body=`FILE                  | `include-before-body:` FILEs (as list)           |
| `--include-after-body=`FILE                   | `include-after-body:` FILEs (as list)            |
| `--no-highlight`                              | ?                                                |
| `--highlight-style=`STYLE\|FILE               | `highlight-style:` STYLE\|FILE                   |
| `--syntax-definition=`FILE                    | `syntax-definitions:`                            |
|                                               | `  - `FILE                                       |
| `--dpi=`NUMBER                                | `dpi:` NUMBER                                    |
| `--abbreviations=`FILE                        | `abbreviations:` FILE                            |
| `--indented-code-classes=`STRING              | `indented-code-classes:` STRINGs (as list)       |
| `--default-image-extension=`EXTENSION         | `default-image-extension:` EXTENSION             |
| `--filter=`PROGRAM                            | `filters:`                                       |
|                                               | `  - `PROGRAM                                    |
| `--lua-filter=`SCRIPTPATH                     | `filters:`                                       |
|                                               | `  - `SCRIPTPATH                                 |
| `--shift-heading-level-by=`NUMBER             | `shift-heading-level-by:` NUMBER                 |
| `--listings`                                  | `listings: true`                                 |
| `--incremental`                               | `incremental: true`                              |
| `--slide-level=`NUMBER                        | `slide-level:` NUMBER                            |
| `--html-q-tags`                               | `html-q-tags: true`                              |
| `--title-prefix=`STRING                       | `title-prefix:` STRING                           |
| `--css=`URL                                   | `css:`                                           |
|                                               | `  - `URL                                        |
| `--natbib`                                    | `cite-method: natbib`                            |
| `--biblatex`                                  | `cite-method: biblatex`                          |
| `--mathml`                                    | `html-math-method:`                              |
|                                               | `  method: mathml`                               |
| `--webtex`[`=`URL]                            | `html-math-method:`                              |
|                                               | `  method: webtex`                               |
|                                               | `  `[`url:` URL]                                 |
| `--mathjax`[`=`URL]                           | `html-math-method:`                              |
|                                               | `  method: mathjax`                              |
|                                               | `  `[`url:` URL]                                 |
| `--katex`[`=`URL]                             | `html-math-method:`                              |
|                                               | `  method: katex`                                |
|                                               | `  `[`url:` URL]                                 |
| `--gladtex`[`=`URL]                           | `html-math-method:`                              |
|                                               | `  method: gladtex`                              |
|                                               | `  `[`url:` URL]                                 |
| `--metadata=`KEY[:VALUE]                      | `metadata:`                                      |
|                                               | `  `KEY`:` VALUE\|`true`                         |
| `--bibliography=`FILE                         | `metadata:`                                      |
|                                               | `  bibliography:` FILE                           |
| `--csl=`FILE                                  | `metadata:`                                      |
|                                               | `  csl:` FILE                                    |
| `--citation-abbreviations=`FILE               | `metadata:`                                      |
|                                               | `  citation-abbreviations:` FILE                 |

If possible, the last four options are better implemented as entries in the source files' YAML metadata block.
