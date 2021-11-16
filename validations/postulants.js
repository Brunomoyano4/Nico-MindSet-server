
const missingInputs = (req,res,next) => {
  let first_name = user_name = email = birth_date = street = street_number = city = 
    postal_code = province = country = telephone = experience = "";
  let okey=true;
  if (!req.body.first_name) {
    first_name= 'first name, '
    okey=false
  }
  if (!req.body.last_name) {
    last_name= 'last name, '
    okey=false
  }
  if (!req.body.user_name) {
    user_name='user name, '  
    okey=false
  }
  if (!req.body.email) {
    emial='email, '
    okey=false
  }
  if (!req.body.birth_date) {
    birth_date='birth date, '
    okey=false
  }
  if (!req.body.street) {
    street='street, '
    okey=false
  }
  if (!req.body.street_number) {
    street_number='street number, '
    okey=false
  }
  if (!req.body.city) {
    city='ciry, '
    okey=false
  }
  if (!req.body.postal_code) {
    postal_code='postal code, '
    okey=false
  }
  if (!req.body.province) {
    province='province, '
    okey=false
  }
  if (!req.body.country) {
    country='country, '
    okey=false
  }
  if (!req.body.telephone) {
    telephone='telephone '
    okey=false
  }
  if (!req.body.experience) {
    experience='experience, '
    okey=false
  }
  if (!okey){ 
    res.status(400).send({ msg: first_name + user_name + email + birth_date + street + street_number + city + 
      postal_code + province + country + telephone + experience + 'are missing'})
  }
  next();
  }

module.exports = {missingInputs};