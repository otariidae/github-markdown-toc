import { describe, it as test } from "kocha"
import { strict as t } from "assert"
import { URL } from "url"
import { readFileSync } from "fs"
import { join } from "path"
import { JSDOM } from "jsdom"
import {
  outlineSectionIterator,
  createEmptyHeadingList
} from "../src/js/outline-utils.ts"
import createFromUrl, {
  GitHubPage,
  ReleasePage,
  CodePage,
  WikiPage,
  UnknownPage
} from "../src/js/page.ts"

function fragmentFromFile(path) {
  const file = readFileSync(join(__dirname, path))
  return JSDOM.fragment(file.toString())
}

function DOMFromFile(path) {
  const file = readFileSync(join(__dirname, path))
  const { document } = new JSDOM(file.toString()).window
  return document
}

function allSectionHasTextAndLink(outline) {
  for (const section of outlineSectionIterator(outline)) {
    if (!("text" in section) || !("link" in section)) {
      return false
    }
  }
  return true
}

// shared class
const { document: emptyDoc, HTMLHeadingElement } = new JSDOM("").window
const emptyOutline = createEmptyHeadingList()

describe("UnknownPage", () => {
  const page = new UnknownPage()

  test("inheritance", () => {
    t.ok(page instanceof GitHubPage)
  })
  test("getHeadingList", () => {
    t.deepStrictEqual(page.getHeadingList(), emptyOutline)
  })
})

describe("ReleasePage", () => {
  const frag = fragmentFromFile("fixtures/release.html")
  const page = new ReleasePage()

  test("inheritance", () => {
    t.ok(page instanceof GitHubPage)
  })
  test("getHeadingList", () => {
    const outline = page.getHeadingList(frag)
    t.ok(allSectionHasTextAndLink(outline))
  })
  test("empty page", () => {
    const outline = page.getHeadingList(emptyDoc)
    t.deepStrictEqual(outline, emptyOutline)
  })
})

describe("Code Page", () => {
  const frag = fragmentFromFile("./fixtures/code.html")
  const page = new CodePage()

  test("inheritance", () => {
    t.ok(page instanceof GitHubPage)
  })
  test("getHeadingList", () => {
    const outline = page.getHeadingList(frag)
    t.ok(allSectionHasTextAndLink(outline))
  })
  test("empty page", () => {
    const outline = page.getHeadingList(emptyDoc)
    t.deepStrictEqual(outline, emptyOutline)
  })
})

describe("Wiki Page", () => {
  const frag = DOMFromFile("./fixtures/wiki.html")
  const page = new WikiPage()

  test("inheritance", () => {
    t.ok(page instanceof GitHubPage)
  })
  test("getHeadingList", () => {
    global.document = frag

    const outline = page.getHeadingList(frag.body)

    delete global.document

    t.ok(allSectionHasTextAndLink(outline))
  })
  test("empty page", () => {
    const outline = page.getHeadingList(emptyDoc)
    t.deepStrictEqual(outline, emptyOutline)
  })
})

test("PageFactory", () => {
  global.URL = URL

  const p0 = createFromUrl("https://github.com/example/example-project")
  const p1 = createFromUrl(
    "https://github.com/example/example-project/tree/master/test"
  )
  const p2 = createFromUrl(
    "https://github.com/example/example-project/releases"
  )
  const p3 = createFromUrl("https://github.com/example/example-project/wiki")
  const p4 = createFromUrl("https://github.com/example")
  const p5 = createFromUrl("https://github.com")

  t.ok(p0 instanceof CodePage)
  t.ok(p1 instanceof CodePage)
  t.ok(p2 instanceof ReleasePage)
  t.ok(p3 instanceof WikiPage)
  t.ok(p4 instanceof UnknownPage)
  t.ok(p5 instanceof UnknownPage)

  delete global.URL
})
