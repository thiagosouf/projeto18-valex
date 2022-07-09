export function mapObjectToUpdateQuery({ object, offset = 1 }) {
  const objectColumns = Object.keys(object)
    .map((key, index) => `"${key}"=$${index + offset}`)
    .join(",");
  const objectValues = Object.values(object);

  return { objectColumns, objectValues };
}


export function nomeCartao(fullName:string){
  fullName = fullName.toLowerCase().replace(/\s(de|da|dos|das)\s/g, ' ');
  const array = fullName.split(" ")
  let nome = ""
  for (let i=0;i<array.length;i++){
      if (i===0 || i===array.length-1){
          nome = nome + " " + array[i]
      }else{
          nome = nome + " " + array[i][0]
      }
  }
  return nome.trim().toUpperCase()
}
