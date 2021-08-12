export default ({ $moment }, inject) => {

    inject('date', {
        format: (strFormat = '') => {
            return $moment().format(strFormat)
        },
        fromNow: (date)=>{
            return $moment(date).fromNow().replace('minutes', 'mins')
        }
    })
}