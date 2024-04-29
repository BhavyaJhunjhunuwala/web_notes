const app = require("express")()
const user = require("../Models/Users")


app.get('/getnotes/:UserId', async (req, res) => {
    try {
        const data = await user.findById(req.params.UserId)
        res.status(200).send({ Notes: data.Notes })
    } catch (err) {
        console.log(err)
        res.send(err).status(500)
    }

})
app.post('/notes/delete/:UserId', async (req, res) => {

    let r = await user.findById(req.params.UserId)
    var arr = r.Notes
    var arr1 = []
    arr.forEach((e) => {
        if (e._id == req.body.id) {
        }
        else {
            arr1.push(e)
        }
    })
    r = await user.updateOne({_id:req.params.UserId}, { $set: { Notes: arr1 } })
    res.send(arr1)

})
app.put("/note/update/:UserId", async (req, res) => {
    try {
        let r = await user.findById(req.params.UserId)
        var arr = r.Notes
        arr.forEach((e) => {
            if (e._id == req.body.id) {
                e.NoteText = req.body.Text
                e.Color = req.body.Color,
                    e.Format = req.body.Format
            }
        })
        r = await user.updateOne({_id: req.params.UserId }, { $set: { Notes: arr } })
        res.send(arr)
    } catch (error) {
        console.log(error)
        res.send(error).status(500)
    }

})
app.post('/new/:UserId', async (req, res) => {
    try {
        const data = {
            NoteText: req.body.Text,
            Format: req.body.Visibilty,
            Color: "#FFFFFF"
        }
        let result = await user.updateOne({ _id: req.params.UserId }, { $push: { Notes: data } })
        const Data = await user.findOne({ _id: req.params.UserId })
        // console.log(result)
        res.status(200).send({ Notes: Data.Notes })
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
})
module.exports = app