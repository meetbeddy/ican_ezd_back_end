module.exports = nairaFormater = data => {
    return `₦ ${data.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}