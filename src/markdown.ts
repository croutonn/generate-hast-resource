import rehypePrism from '@mapbox/rehype-prism'
import frontMatter from 'front-matter'
import fromParse5 from 'hast-util-from-parse5'
import { parse as parse5 } from 'parse5'
import stringify from 'rehype-stringify'
import katex from 'remark-html-katex'
import math from 'remark-math'
import markdown from 'remark-parse'
import remarkRehype from 'remark-rehype'
import unified from 'unified'
import type { Node } from 'unist'

interface IHastNode extends Node {
  children?: IHastNode[]
}

interface IFirstLevelHastNode extends IHastNode {
  children: [IHastNode, IHastNode]
}

interface IRootHastNode extends IHastNode {
  children: [IFirstLevelHastNode, IFirstLevelHastNode]
}

const processor = unified()
  .use(markdown)
  .use(math)
  .use(katex)
  .use(remarkRehype)
  .use(rehypePrism)
  .use(stringify)
  .freeze()

const markdownToHast = (markdownText: string): Node => {
  const html = processor.processSync(markdownText).contents as string
  const p5ast = parse5(html, { sourceCodeLocationInfo: true })
  const hast = {
    type: 'root',
    children: (fromParse5(p5ast) as IRootHastNode).children[0].children[1]
      .children,
    data: { quirksMode: true },
  }
  return hast
}

const readMarkdown = <T = unknown>(
  markdownText: string
): { attributes: T; body: string } => {
  const { attributes, body } = frontMatter<T>(markdownText)
  return {
    attributes,
    body,
  }
}

const markdownToHastResource = <T = unknown>(markdownText: string): string => {
  const { attributes, body } = readMarkdown<T>(markdownText)
  const resource = {
    attributes,
    body: markdownToHast(body),
  }
  return JSON.stringify(resource)
}

export default markdownToHastResource
