declare global {
  var _mongoClientPromise: any
  var mongoose: any
}

declare module globalThis {
  var mongoose: any
}
