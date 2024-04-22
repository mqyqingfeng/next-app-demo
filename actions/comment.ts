import { readFile, writeFile } from "fs/promises"

export default async function handleCommentPost(req, res) {
  const {slug, comment} = req.body

  let comments

  try {
    const commentsData = await readFile("./comments/" + slug + ".json", "utf8")
    comments = JSON.parse(commentsData)
  } catch (err) {
    if (err.code === "ENOENT") {
      comments = []
    } else {
      throw err
    }
  }

  comments.push({
    content: comment
  })
  
  const commentsFile = "./comments/" + slug + ".json"
  await writeFile(commentsFile, JSON.stringify(comments, null, 2))
}