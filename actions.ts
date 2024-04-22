export async function serverAction(req, res) {
  const action = req.url.slice(9)

  const module = await import("./actions/" + action + ".js")
  const actionFunction = module.default
  await actionFunction(req, res)

  res.redirect(302, "/" + req.body.slug)
}