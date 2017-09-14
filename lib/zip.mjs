import yazl from 'yazl'
import path from 'path'
import fs from 'fs'

const zip = new yazl.ZipFile()
const output = fs.createWriteStream('github-markdown-toc.zip')
const dist = fs.readdirSync('dist')
dist.forEach(filename => zip.addFile(`dist/${filename}`, filename))
zip.outputStream.pipe(output)
zip.end()

