const files = require.context('.', false, /\.js$/)
const modules = []

files.keys().forEach(key => {
  if (key === './index.js') return
  const item = files(key).routes
  modules.push(...item)
})

export default modules