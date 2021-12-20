module.exports = {
    //put dates in an easier format to read
    format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
    },
    //add "s" at the end of a word if it is plural. used for upvote(s) and comment(s)
    format_plural: (word, amount) => {
      if (amount !== 1) {
        return `${word}s`;
      }
  
      return word;
    }
}