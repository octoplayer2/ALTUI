/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
 
const mydb = require("./db");
var db = mydb.getDB()

exports.helloHttp = function helloHttp (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var idx = findDevice(req)
  res.status(200).json( (idx>=0) ? db[idx] : null )
};

function findDevice(req) {
	var dref = req.body.type + ':' + req.body.id 
	for( var i = 0 ; i<db.length ; i++) {
		if (db[i].manufacturer_id == req.body.manufacturer) {
			for( var j =0 ; j<db[i].device_ref.length ; j++) {
				if (db[i].device_ref[j]==dref) {
					return i;
				}
			}
		}
	}
	return -1
};
