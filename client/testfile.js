const products = [1,2,3,4,5,6,7,8,9,23,45,56,78,86,345,654]
function getPages() {
    let queueProducts = products;
    let pagecount = 0;
    let pages = [];
    if (products) {
        let numPages = Math.ceil(queueProducts.length / 6)
        console.log('pages', numPages)
        while(pagecount < numPages) {
            const inPage = queueProducts.slice(0,6);
            const inqueue = queueProducts.slice(6, queueProducts.length)
            pages.push(inPage)
  
            queueProducts=inqueue;
            pagecount++
        }
    }
    // setPerpage(pages)
    return pages
}

console.log(getPages())