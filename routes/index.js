export default (app, io) => {
  app.get('*', (req, res) => { res.sendFile('../dist/index.html') })
}
