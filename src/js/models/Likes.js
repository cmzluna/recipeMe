export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, img) {
    const like = { id, title, img };
    this.likes.push(like);

    // Persist data in localStorage
    this.persistData();

    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);
    this.likes.splice(index, 1);
    // Persist data in localStorage
    this.persistData();
  }

  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem("likes", JSON.stringify(this.likes)); //setItem only accepts strings so I convert it using stringify
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem("likes"));
    // this converts everything back

    // Restore likes from localStorage
    if (storage) this.likes = storage;
  }
}
