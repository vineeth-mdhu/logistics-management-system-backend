const router = require('express').Router()
const supabase = require('../utils/supabaseClient')

router.get('/', async (req, res) => {
    const sid = req.query.sid;
    const qty = req.query.qty;
    const pid = req.query.pid;

    try {

        const route_data = await supabase
            .from('route')
            .select('from,to,distance')
            .eq('from', sid)
            .order('distance', { ascending: true })

        console.log(route_data)


        const inventory_data = await supabase
            .from('inventory')
            .select('*')

        const vehicle_type = qty < 100 ? 'Van' : qty > 100 && qty < 500 ? 'Mini-truck' : 'Truck'

        const vehicle_data = await supabase
            .from('vehicle')
            .select('*')
            .eq('type', vehicle_type)
            .eq('status', 'available')


        if (vehicle_data) {
            var vehicle = vehicle_data.data[0]
            vehicle.status='not available'
            try {
                const success = await supabase
                    .from('vehicle')
                    .upsert(vehicle)
                    
                console.log(success)
            }
            catch(error){
                console.log(error)
            }

            if (inventory_data && route_data) {
                for (const element of route_data.data) {
                    console.log(element)
                    for (const item of inventory_data.data)
                        if (element.to == item.eid && item.pid == pid && item.quantity_left > qty) {
                            var d = new Date(Date.now());
                            d.setMinutes(d.getMinutes() +element.distance/vehicle.speed);

                            const data = { 'tid': Math.floor(Math.random() * 1000), 'vid': vehicle.vid, 'delivery_time': d, 'from': element.to, 'to': sid, 'pid': pid, 'quantity': qty, 'status': 'enroute' }
                            try {
                                const success = await supabase
                                    .from('transport')
                                    .insert(data, { returning: "minimal" })
                                res.json(success)
                            }
                            catch (e) {
                                console.log("hi")
                                console.log(e)
                            }
                        }
                }
            }
        }
    }
    catch {
        console.log('error')
    }

})

module.exports = router