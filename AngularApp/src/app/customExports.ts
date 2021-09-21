export  function mediaPrefix(devObj){
    let {media} = devObj
    return "./assets/media/"+media
}



export function eventDispatcher(   devObj:{event:string,element:HTMLElement | Window | Element}   ){

    try {
        let event0= new Event(devObj.event)
        devObj.element.dispatchEvent(event0)
        // console.log(event0)
    }
    catch(e){
        let eventLegacy = document.createEvent("Event");
        eventLegacy.initEvent(devObj.event, false, true);
        devObj.element.dispatchEvent(eventLegacy)
    }
}


export function classPrefix(devObj:{view:string}){
    let {view} = devObj
    let prefix = "a_p_p_"+view
    return (devObj:{val:string})=>{
        let {val} = devObj
        return prefix+val
    }
}
