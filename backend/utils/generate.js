const keywords = ["A","B","C","D","E","F","J"]

const generateTaskKey = (username , taskcounter) => {
  const letter = username.charAt(0).toUpperCase()
  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)]

 return `${letter}${randomKeyword}-${taskcounter}`
}

module.exports = {
    generateTaskKey
}