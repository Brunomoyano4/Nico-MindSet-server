// const missingInputs = (req,res) => {
//   let psy = post = date = time = stat = "";
//   let okey=true;
//   if (!req.query.psychologyId) {
//     psy= 'psychologyId, '
//     okey=false
//   }
//   if (!req.query.postulantId) {
//     post='postulantId, '
//     okey=false
//   }
//   if (!req.query.date) {
//     date='date, '
//     okey=false
//   }
//   if (!req.query.time) {
//     time='time, '
//     okey=false
//   }
//   if (!req.query.status) {
//     stat='status, '
//     okey=false
//   }
//   if (!okey){ 
//     res.status(400).send({ msg: psy + post + date + time + stat + 'are missing'})
//   }
// }