const cheerio = require("cheerio");
const url = require("url");

const { arrayPrinter, axiosWrapper } = require("./utilities");

class Loader {
  constructor(start, base, count) {
    this.start = start;
    this.base = base;
    this.count = count;
    this.links = [];
  }

  async go(link = this.start) {
    await this.eventLoop(link);
    arrayPrinter(this.links);
    return this.links;
  }

  async eventLoop(link) {
    // bootstraps the loop
    const data = await this.mainEvent(link);
    let counter = 0;
    while (true) {
      if (this.links.length === this.count) {
        break;
      }
      let newData = await this.mainEvent(data[counter]); // eslint-disable-line
      data.push(...newData);
      counter += 1;
    }
  }

  async mainEvent(link) {
    const result = await axiosWrapper(link);
    const links = this.parsePage(result);
    return this.addLinks(links);
  }

  parsePage(data) {
    const $ = cheerio.load(data);
    const links = $("a")
      .map((i, el) => $(el).attr("href"))
      .get();
    const internalLinks = links
      .map(el => {
        let currentLink;
        try {
          currentLink = new url.URL(String(el), this.base);
        } catch (TypeError) {
          console.error("Value is not a valid URL");
        }
        if (
          currentLink.origin === this.base &&
          currentLink.hash === "" &&
          currentLink.href[currentLink.href.length - 1] !== "#"
        ) {
          // only adds link that is an internal link, and not a hash link
          return currentLink.href;
        }
        return null;
      })
      .filter(value => value !== null);
    return internalLinks;
  }

  addLinks(array) {
    const newLinks = [];
    for (let i = 0; i < array.length; i += 1) {
      if (this.links.indexOf(array[i]) === -1 && array[i] !== this.start) {
        // only adds link that are not there yet, and the link that is not the starting link
        this.links.push(array[i]);
        newLinks.push(array[i]);
      }
      if (this.links.length === this.count) {
        // stops early if count is achieved
        break;
      }
    }
    return newLinks;
  }
}

module.exports = Loader;
