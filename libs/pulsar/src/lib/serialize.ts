export const Serialize = <T>(data: T): Buffer =>
  Buffer.from(JSON.stringify(data));

export const Deserialize = <T>(data: Buffer): T => JSON.parse(data.toString());
