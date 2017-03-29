import test from 'tape'
import jsdom from 'jsdom'
import chrome from 'sinon-chrome'
import getHeaderData from '../src/get-header-data.js'

test('get-header-data', t  =>{
  jsdom.env(`
    <div class="markdown-body">
      <h1>
        <a class="anchor" herf="example.com" id="example"></a>
        EXAMPLE
      </h1>
    </div>
    `,
    { url: 'https://github.com/example/example-app' },
    (err, window) => {
      if (err) {
        throw err
      }
      getHeaderData.bind(window)()
        .then(result => {
          console.log(result)
          global = this
          t.end()
        })
        .catch(e => {
          throw e
        })
    })
})
