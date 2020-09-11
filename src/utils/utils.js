const slugify = text => (
    text.toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/[^\w+]+/g, '-') // remove all non-word chars
    .replace(/--+/g, '-') // replace multiple - with single -
    .replace(/^-+/g, '-') // trim - from start
    .replace(/-+$/g, '-') // trim - from end
)

module.exports =  {
    slugify
}