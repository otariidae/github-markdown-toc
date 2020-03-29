import { describe, it as test } from "kocha"
import { strict as t } from "assert"
import { createPageTypesFromURL, PageTypes } from "../src/js/page-type"

describe("check-page-type", () => {
  test("code", () => {
    t.equal(
      createPageTypesFromURL("https://github.com/example/example-project"),
      PageTypes.CODE
    )
    t.equal(
      createPageTypesFromURL(
        "https://github.com/example/example-project/tree/master/test"
      ),
      PageTypes.CODE
    )
    t.equal(
      createPageTypesFromURL(
        "https://github.com/example/example-project/blob/master/package.json"
      ),
      PageTypes.CODE
    )
  })
  test("release", () => {
    t.equal(
      createPageTypesFromURL(
        "https://github.com/example/example-project/releases"
      ),
      PageTypes.RELEASE
    )
  })
  test("wiki", () => {
    t.equal(
      createPageTypesFromURL("https://github.com/example/example-project/wiki"),
      PageTypes.WIKI
    )
    t.equal(
      createPageTypesFromURL(
        "https://github.com/example/example-project/wiki/API-changes"
      ),
      PageTypes.WIKI
    )
  })
  test("unknown", () => {
    t.equal(
      createPageTypesFromURL(
        "https://github.com/example/example-project/releases/tag/v1.0.0"
      ),
      PageTypes.UNKNOWN
    )
    t.equal(
      createPageTypesFromURL("https://github.com/example"),
      PageTypes.UNKNOWN
    )
    t.equal(createPageTypesFromURL("https://github.com"), PageTypes.UNKNOWN)
  })
})
