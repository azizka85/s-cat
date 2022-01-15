class ResponseMock {
  statusCode = 200;
  contentType = '';
  content = '';

  get status() {
    return this.statusCode;
  }

  setHeader(name, value) {
    if(name === 'Content-Type') {
      this.contentType = value;
    }
  }

  write(content) {
    this.content = content;
  }

  text() {
    return this.content;
  }

  json() {
    return JSON.parse(this.content);    
  }
}

module.exports = {
  ResponseMock
};
