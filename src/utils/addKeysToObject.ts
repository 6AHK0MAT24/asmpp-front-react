const addKeysToObject = (obj: any) =>
  obj.map((item: any, index: number) =>
    Object.assign(item, { id: index + 1, key: index })
  )

export default addKeysToObject
