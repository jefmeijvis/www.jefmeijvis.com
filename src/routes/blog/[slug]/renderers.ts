import BlockQuote from '$lib/renderers/blockQuote.svelte';
import Code from '$lib/renderers/code.svelte';
import Heading from '$lib/renderers/heading.svelte';
import Image from '$lib/renderers/image.svelte';
import Link from '$lib/renderers/link.svelte';
import List from '$lib/renderers/list.svelte';
import ListItem from '$lib/renderers/listItem.svelte';
import Paragraph from '$lib/renderers/paragraph.svelte';
import Table from '$lib/renderers/table.svelte';
import TableCell from '$lib/renderers/tableCell.svelte';



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