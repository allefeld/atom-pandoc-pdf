---
header-includes: \AtBeginEnvironment{quote}{\scshape\bfseries\large}
---

***

>   Heading identifiers and attributes

# Heading with attributes {#id .class key=value}

# Another heading

# Unnumbered heading {-}

# Unlisted heading {.unnumbered .unlisted}



>   Links to headings

Links to headings, like [this](#id)
and [that](#another-heading),
also [Unnumbered Heading]
and [that section][Unlisted heading].



>   Line breaks

There is a break between the this line\
and this one.



>   Fenced code blocks and attributes

~~~~ {#mycode .latex .numberLines startFrom="100"}
Pandoc's Markdown supports \emph{fenced} code blocks,
using tildes \~ or backticks `. These blocks can have
\textbf{attributes}.
~~~~ 

````javascript
console.log('error')
````



>   Line blocks

| Total control
| is only to be obtained
| by controlling both the horizontal
| and the vertical.
|   – *The Not So Short Introduction to \LaTeX2e*



>   Compact and loose lists

*   close
*   together

and

*   further

*   apart



>   Numbered lists

c)  Ninth
d) Tenth
e) Eleventh
    i.   subone
    ii.  subtwo
    iii. subthree
#.   yet
#.  another
#.  item



>   Task lists

- [ ] an unchecked task list item
- [x] checked item



>   Definition lists

Term 1

:   Definition 1

Term 2

:   Definition 2a

:   Definition 2b



>   Numbered example lists

(@)  My first example.
(@)  My second example.

(@good)  This is a good example.

As (@good) illustrates, ...



>   Horizontal rules

*  *  *



\newpage

>   Simple tables


  Right     Left     Center     Default
-------     ------ ----------   -------
     12     12        12            12
    123     123       123          123
      1     1          1             1

Table:  The header can be in simple tables.



>   Multiline tables

-------------------------------------------------------------
 Centered   Default           Right Left
  Header    Aligned         Aligned Aligned
----------- ------- --------------- -------------------------
   First    row                12.0 Example of a row that
                                    spans multiple lines.

  Second    row                 5.0 Here's another one. Note
                                    the blank line between
                                    rows.
-------------------------------------------------------------

:   The header can be omitted in multiline tables.



>   Pipe tables


| Right | Left | Default | Center |
|------:|:-----|---------|:------:|
|   12  |  12  |    12   |    12  |
|  123  |  123 |   123   |   123  |
|    1  |    1 |     1   |     1  |

  : In pipe tables, the header cannot be omitted.
  


>   YAML metadata

---
title:  'This is the title: it contains a colon'
author:
- Author One
- Author Two
keywords: [nothing, nothingness]
abstract: |
  This is the abstract.

  It consists of two paragraphs.
...



>   <https://pandoc.org/MANUAL.html#inline-formatting>


::: notes

This is my note.

- It can contain Markdown
- like this list

:::
