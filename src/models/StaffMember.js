export default function(nm, rt){
    return {
        id: new Date().valueOf() + '' + Math.floor((Math.random() * 10000) + 1),
        name: nm,
        rate: rt
    }
    
}