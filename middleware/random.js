const random = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const insert = async (collection, url) => {
    const a = await collection.findOne({ url: url });
    if (a) return a.short;
    else {
      const obj = {
        url: url,
        short: await random()
      }
      obj.shorturl='http://localhost/api/link/visit/'+obj.short;
      await collection.insertOne(obj);
      return obj.short;
    }
  }
  const read = async (collection, short) => {
    const obj = {
      short: short
    }
    const a = await collection.findOne(obj);
    return a;
  }
  
  module.exports = { insert, read };
  