export const messageFormat = function(id, title, content, status) {
    let variant = "primary";
    if (status == 200) { variant = "success" }
    else if (status == 500) { variant = "warning" }
    else {variant = "danger"}
    return {
        id: id,
        title: title,
        content: content,
        variant: variant
    }
}