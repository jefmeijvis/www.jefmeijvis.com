import { asClassComponent } from 'svelte/legacy';
import BlockQuote from '$lib/components/markdown-renderers/blockQuote.svelte';
import CodeSelector from '$lib/components/markdown-renderers/codeSelector.svelte';
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
    code : asClassComponent(CodeSelector),
    heading : asClassComponent(Heading),
    paragraph : asClassComponent(Paragraph),
    list : asClassComponent(List),
    listItem : asClassComponent(ListItem),
    image : asClassComponent(Image),
    blockquote : asClassComponent(BlockQuote),
    link : asClassComponent(Link),
    table : asClassComponent(Table),
    tablecell: asClassComponent(TableCell),
}

export default renderers;