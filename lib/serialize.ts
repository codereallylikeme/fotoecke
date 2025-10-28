export function serializeDoc(doc: any) {
  if(!doc) return null
  return{
    ...doc,
    _id: doc._id.toString(),
    createdAt: doc.createdAt ? doc.createdAt.toISOString() : null,
    updatedAt: doc.updatedAt ? doc.updatedAt.toISOString() : null,  
    date: doc.date ? doc.date.toISOString() : null,
  }
}

export function serializeDocs(docs: any[]) {
  return docs.map(serializeDoc)
}