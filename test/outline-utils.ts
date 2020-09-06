import { describe, it as test, beforeEach } from "kocha"
import { strict as t } from "assert"
import { JSDOM } from "jsdom"
import {
  createOutlineFrom,
  createTreeFrom,
  outlineSectionIterator,
  isEmptyOutline,
  isEmptyTree,
} from "../src/js/outline-utils"
import { Section } from "h5o"

declare global {
  namespace NodeJS {
    interface Global {
      document: Document
    }
  }
}

beforeEach(() => {
  delete global.document
})

{
  const { document } = new JSDOM(`
    <div id="root">
      <h1>TEST</h1>
    </div>
  `).window
  const root = document.getElementById("root") as HTMLElement

  describe("createOutlineFrom", () => {
    test("div", () => {
      global.document = document

      const outline = createOutlineFrom(root)
      t.equal(outline.sections[0].startingNode.tagName.toLowerCase(), "body")
    })
  })

  describe("createTreeFrom", () => {
    test("div", () => {
      global.document = document

      const tree = createTreeFrom(root)

      t.deepStrictEqual(tree, {
        link: null,
        text: "",
        sections: [
          {
            link: null,
            text: "TEST",
            sections: [],
          },
        ],
      })
    })
  })
}

describe("outlineSectionIterator", () => {
  test("iterator", () => {
    const outline = {
      text: "",
      link: null,
      sections: [],
    }
    const iterator = outlineSectionIterator(outline)
    t.ok(Symbol.iterator in iterator)
  })
  test("count", () => {
    const outline = ({
      sections: [
        { sections: [] }, // 1
        {
          sections: [
            // 2
            { sections: [] }, // 3
            { sections: [] }, //4
          ],
        },
      ],
    } as any) as Section
    const iterator = outlineSectionIterator(outline)
    t.equal([...iterator].length, 4)
  })
})

describe("isEmptyOutline", () => {
  test("embeded empty sections", () => {
    const { document } = new JSDOM(`
    <section>
      <section>
      </section>
    </section>
    `).window

    global.document = document

    const outline = createOutlineFrom(document.body)
    t.ok(isEmptyOutline(outline))
  })
  test("0 length", () => {
    const { document } = new JSDOM("").window

    global.document = document

    const outline = createOutlineFrom(document.body)
    t.ok(isEmptyOutline(outline))
  })
  test("not empty", () => {
    const { document } = new JSDOM(`
      <h1>TEST</h1>
    `).window

    global.document = document

    const outline = createOutlineFrom(document.body)
    t.ok(!isEmptyOutline(outline))
  })
})

describe("isEmptyTree", () => {
  test("embeded empty sections", () => {
    const { document } = new JSDOM(`
    <section>
      <section>
      </section>
    </section>
    `).window

    global.document = document

    const tree = createTreeFrom(document.body)
    t.ok(isEmptyTree(tree))
  })
  test("0 length", () => {
    const { document } = new JSDOM("").window
    global.document = document

    const tree = createTreeFrom(document.body)
    t.ok(isEmptyTree(tree))
  })
  test("not empty", () => {
    const { document } = new JSDOM(`
      <h1>TEST</h1>
    `).window

    global.document = document

    const tree = createTreeFrom(document.body)
    console.log(tree)
    t.ok(!isEmptyTree(tree))
  })
})
