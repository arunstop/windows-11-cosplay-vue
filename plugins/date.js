export default ({ $moment }, inject) => {

    inject('date', {
        now: (strFormat='') => {
            return $moment().format(strFormat)
        },
        format: (date, strFormat) => {
            // if date is null, use today's date
            return $moment(date||$moment()).format(strFormat)
        },
        fromNow: (date) => {
            return {
                full: $moment(date).fromNow().replace('minutes', 'mins'),
                short: $moment(date).fromNow(true)
                    .replace('seconds', 's')
                    .replace('minutes', 'm')
                    .replace('hours', 'h')
                    .replace('days', 'd')
                    .replace('a day', 'Yesterday')
                    .replace('an hour', '1 h')
                    .replace('an minute', '1 m'),
            }
        }
    })
}