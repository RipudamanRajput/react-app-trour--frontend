import swal from "sweetalert";

export function AlertPop(title:any,text:any,icon:any) {
    console.log(title,text,icon)
     swal({
        title: title,
        text: text,
        icon: icon,
    })



}