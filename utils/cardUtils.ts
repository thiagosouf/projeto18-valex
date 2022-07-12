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
  
  export function expiration(cardDate:string){ 
    const array = cardDate.split("/")
    const m = String (new Date().getMonth()+1).padStart(2,'0');
    const y = String (new Date().getFullYear()-2000).padStart(2,'0');
    if (parseInt(array[1])>parseInt(y) || (parseInt(array[0])>parseInt(m) && parseInt(array[1])===parseInt(y) )){
      return true
    } else {
      return false
    }
  
  }