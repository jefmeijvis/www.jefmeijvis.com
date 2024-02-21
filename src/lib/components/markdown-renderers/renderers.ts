import BlockQuote from '$lib/components/markdown-renderers/blockQuote.svelte';
import Code from '$lib/components/markdown-renderers/code.svelte';
import Heading from '$lib/components/markdown-renderers/heading.svelte';
import Image from '$lib/components/markdown-renderers/image.svelte';
import Link from '$lib/components/markdown-renderers/link.svelte';
import List from '$lib/components/markdown-renderers/list.svelte';
import ListItem from '$lib/components/markdown-renderers/listItem.svelte';
import Paragraph from '$lib/components/markdown-renderers/paragraph.svelte';
import Table from '$lib/components/markdown-renderers/table.svelte';
import TableCell from '$lib/components/markdown-renderers/tableCell.svelte';

let renderers =
{
    code : Code,
    heading : Heading,
    paragraph : Paragraph,
    list : List,
    listItem : ListItem,
    image : Image,
    blockquote : BlockQuote,
    link : Link,
    table : Table,
    tablecell: TableCell,
}

export default renderers;