export const messageFormat = function(title, content, status) {
    let variant = "primary";
    if (status == 200) { variant = "success" }
    else if (status == 400) { variant = "warning" }
    return {
        title: title,
        content: content,
        variant: variant
    }
}