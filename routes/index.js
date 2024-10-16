export default (app, handle) => {

  app.get('*', (req, res) => {return handle(req, res)})

}
