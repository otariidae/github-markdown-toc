import { ZipFile } from 'yazl'
import { join } from 'path'
import { createWriteStream, readdirSync } from 'fs'

const zip = new ZipFile()
const output = createWriteStream('github-markdown-toc.zip')
const dist = readdirSync(join(__dirname, '../dist'))
dist.forEach(filename => {
  zip.addFile(`dist/${filename}`, filename)
})
zip.outputStream.pipe(output)
zip.end()
